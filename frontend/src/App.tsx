import React from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { themeOptions } from "./assets/theme";
import Board from "./screens/Board";

const theme = createTheme(themeOptions);
const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/sign-up" element={<SignUpScreen />} />
                <Route path="/app" element={<Board />} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
