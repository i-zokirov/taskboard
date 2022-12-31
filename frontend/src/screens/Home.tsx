import React from "react";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Box textAlign="center">
            <Container sx={{ marginTop: "10vh" }}>
                <Typography variant="h5" color="#9e9e9e">
                    Secure Task Management for Teams
                </Typography>
                <Box display="flex" justifyContent={"center"}>
                    <Typography fontWeight="bold" variant="h2">
                        Your Team.{" "}
                    </Typography>

                    <Typography
                        paddingLeft={"10px"}
                        fontWeight="bold"
                        variant="h2"
                    >
                        {" "}
                        Aligned.
                    </Typography>
                </Box>
                <br />

                <button
                    style={{
                        fontSize: "22px",
                        height: "50px",
                        borderRadius: "50px",
                        padding: "30px",
                    }}
                    className="btn"
                >
                    <Link style={{ color: "white" }} to={"/sign-up"}>
                        {" "}
                        Get started
                    </Link>
                </button>

                <Container>
                    <img
                        src="/homescreen.jpg"
                        alt=""
                        width={"80%"}
                        height={"80%"}
                    />
                </Container>
            </Container>
        </Box>
    );
};

export default Home;
