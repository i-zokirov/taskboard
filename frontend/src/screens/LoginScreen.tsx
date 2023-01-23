import React from "react";
import Avatar from "@mui/material/Avatar";
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
import { useAppSelector, useAuthenticate } from "../reduxApp/hooks";
import * as yup from "yup";
import { Formik } from "formik";
import { UserLoginValues } from "../interfaces";
import { Alert } from "@mui/material";

const initialValues: UserLoginValues = {
    email: "",
    password: "",
    rememberUser: false,
};
const validationSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup.string().required("Password is required"),
    rememberUser: yup.boolean(),
});

const LoginScreen: React.FC = () => {
    const authenticate = useAuthenticate();

    const handleFormSubmit = (values: UserLoginValues) => {
        authenticate(values);
    };
    const { loading, error } = useAppSelector((state) => state.auth);

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
                {error && <Alert severity="error">{error}</Alert>}
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                    }) => (
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
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                value={values.email}
                                onChange={handleChange}
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
                                error={
                                    touched.password && Boolean(errors.password)
                                }
                                helperText={touched.password && errors.password}
                                value={values.password}
                                onChange={handleChange}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id="rememberUser"
                                        name="rememberUser"
                                        color="primary"
                                        value={values.rememberUser}
                                        onChange={handleChange}
                                    />
                                }
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
                        </Box>
                    )}
                </Formik>
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
            <br />
            <Copyright />
        </Container>
    );
};

export default LoginScreen;
