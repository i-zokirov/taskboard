import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Copyright from "../components/custom/Copyright";

const Page404 = () => {
    return (
        <Box width="100vw" height="100vh" textAlign={"center"} padding="60px">
            <Container>
                <Typography variant="h5" color="#9e9e9e">
                    OOPS!
                </Typography>
                <Box display="flex" justifyContent={"center"}>
                    <Typography fontWeight="bold" variant="h2">
                        Page Not Found
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
                    <Link style={{ color: "white" }} to={"/"}>
                        Go To Homepage
                    </Link>
                </button>

                <Container sx={{ textAlign: "center" }}>
                    <img src="/404.jpg" alt="" width={"80%"} height={"80%"} />
                </Container>
                <Container>
                    <Typography variant="caption">
                        <a href="https://www.freepik.com/free-vector/error-404-concept-landing-page_4660877.htm#query=404&position=19&from_view=search&track=sph">
                            Image by pikisuperstar
                        </a>
                        on Freepik
                    </Typography>
                    <Copyright />
                </Container>
            </Container>
        </Box>
    );
};

export default Page404;
