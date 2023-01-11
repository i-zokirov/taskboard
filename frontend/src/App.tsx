import React from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { themeOptions } from "./assets/theme";
import Board from "./screens/Board";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Home from "./screens/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Page404 from "./screens/404Page";
const theme = createTheme(themeOptions);
const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <CssBaseline />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/app" element={<Board />} />
                    </Route>
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/sign-up" element={<SignUpScreen />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default App;
