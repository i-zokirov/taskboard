import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../components/custom/Copyright";
import { Link as RouterLink } from "react-router-dom";

import LoadingButton from "@mui/lab/LoadingButton";
import { icons } from "../assets/icons";
import { useAppDispatch, useAppSelector } from "../reduxApp/hooks";
import { authenticateUser } from "../reduxApp/features/auth/authSlice";
import { Status } from "../types";
const LoginScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const body = {
            email: formData.get("email")!.toString(),
            password: formData.get("password")!.toString(),
        };
        if (body.email && body.password) {
            dispatch(authenticateUser(body));
        }
    };

    const { loading, userData, status, error } = useAppSelector(
        (state) => state.auth
    );

    const navigate = useNavigate();
    useEffect(() => {
        if (status === Status.FulFilled && userData) {
            navigate("/app");
        }

        if (error) {
            // handle error
        }
    }, [status, error, userData]);

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />

                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        startIcon={icons.login()}
                        loading={loading}
                    >
                        Sign In
                    </LoadingButton>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                component={RouterLink}
                                to="/sign-up"
                                variant="body2"
                            >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright />
        </Container>
    );
};

export default LoginScreen;
