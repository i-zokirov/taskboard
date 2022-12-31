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
const theme = createTheme(themeOptions);
const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <CssBaseline />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/sign-up" element={<SignUpScreen />} />

                    <Route path="/app" element={<Board />} />
                </Routes>
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default App;
