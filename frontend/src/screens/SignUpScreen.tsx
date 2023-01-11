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
import { useAppSelector, useRegisterUser } from "../reduxApp/hooks";
import { Formik, FormikHelpers } from "formik";
import { UserRegisterValues } from "../interfaces";
import LoadingButton from "@mui/lab/LoadingButton";
import * as yup from "yup";

const initialValues: UserRegisterValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};

const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
    marketingConsent: yup.boolean(),
});

const SignUpScreen: React.FC = () => {
    const { loading } = useAppSelector((state) => state.register);
    const registerUser = useRegisterUser();
    const handleSubmit = (
        values: UserRegisterValues,
        actions: FormikHelpers<UserRegisterValues>
    ) => {
        registerUser(values);
    };
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
                    Sign up
                </Typography>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
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
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={handleChange}
                                        value={values.firstName}
                                        error={
                                            touched.firstName &&
                                            Boolean(errors.firstName)
                                        }
                                        helperText={
                                            touched.firstName &&
                                            errors.firstName
                                        }
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        onChange={handleChange}
                                        value={values.lastName}
                                        error={
                                            touched.lastName &&
                                            Boolean(errors.lastName)
                                        }
                                        helperText={
                                            touched.lastName && errors.lastName
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={handleChange}
                                        value={values.email}
                                        error={
                                            touched.email &&
                                            Boolean(errors.email)
                                        }
                                        helperText={
                                            touched.email && errors.email
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={handleChange}
                                        value={values.password}
                                        error={
                                            touched.password &&
                                            Boolean(errors.password)
                                        }
                                        helperText={
                                            touched.password && errors.password
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                name="marketingConsent"
                                                id="marketingConsent"
                                                value={values.marketingConsent}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
                            </Grid>
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                loading={loading}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </LoadingButton>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link
                                        component={RouterLink}
                                        to="/login"
                                        variant="body2"
                                    >
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Formik>
            </Box>
            <Copyright />
        </Container>
    );
};

export default SignUpScreen;
