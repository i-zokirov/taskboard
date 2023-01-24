import React, { useState } from "react";
import {
    Box,
    Divider,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import Carousel from "../components/custom/Carousel";
import { icons } from "../assets/icons";
import Copyright from "../components/custom/Copyright";

const images = [
    "/homescreen.png",
    "/homescreen2.png",
    "/homescreen3.png",
    "/homescreen4.png",
];

const features = [
    {
        title: "Customizable task lists",
        body: "Create and organize your tasks in a way that makes sense for you, with the ability to create custom lists, labels, and tags.",
    },
    {
        title: "Reminders and notifications",
        body: "Never miss a deadline again with customizable reminders and notifications that keep you on track and on schedule.",
    },
    {
        title: "Reports and analytics",
        body: "Track your productivity and see how you're spending your time with detailed reports and analytics that give you a clear picture of your work habits.",
    },
    {
        title: "Collaboration tools",
        body: "Easily share your tasks and projects with team members and coworkers, and stay up-to-date on their progress in real-time.",
    },
];

const features2: Feature[] = [
    {
        title: "Dashboard",
        subtitle: "Everything in one place",
        icon: "dashboard",
        image: "/homescreen2.png",
    },
    {
        title: "Projects",
        subtitle: "Clear overview, full efficiency",
        icon: "rocketicon",
        image: "/homescreen.png",
    },
    {
        title: "Tasks",
        subtitle: "Where work gets done",
        icon: "checkcircle",
        image: "/homescreen4.png",
    },
    {
        title: "Agenda",
        subtitle: "Your own personal board",
        icon: "pin",
        image: "/homescreen3.png",
    },
];

type Feature = {
    title: string;
    subtitle: string;
    icon: string;
    image: string;
};

const Home: React.FC = () => {
    const [value, setValue] = useState<Feature>(features2[0]);

    return (
        <Box textAlign="center">
            <Box
                display="flex"
                justifyContent={"space-between"}
                height="8vh"
                alignItems={"center"}
                padding="10px"
            >
                <Box>
                    <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        color="#00aaff"
                    >
                        Taskboard
                    </Typography>
                </Box>
                <Box width="50%" id="nav-items-container">
                    <span className="nav-item">
                        <a href="#home">Product</a>
                    </span>
                    <span className="nav-item">
                        <a href="#features">Features</a>
                    </span>
                    <span className="nav-item">
                        <a href="#home">Pricing</a>
                    </span>
                    <span className="nav-item">
                        <a href="#home">Contact</a>
                    </span>
                </Box>
                <Box>
                    <button className="btn-login">
                        <Link style={{ color: "#00aaff" }} to={"/login"}>
                            Login
                        </Link>
                    </button>
                    <button
                        style={{ borderRadius: "50px", fontSize: "16px" }}
                        className="btn nav-btn"
                    >
                        <Link style={{ color: "white" }} to={"/sign-up"}>
                            Sign Up
                        </Link>
                    </button>
                </Box>
            </Box>
            <Box
                sx={{
                    height: "95vh",
                    padding: "60px",
                }}
                component="section"
                id="home"
            >
                <Box
                    display="flex"
                    justifyContent={"space-evenly"}
                    alignItems="center"
                    height="100%"
                >
                    <Box width="60%">
                        <img
                            alt="homescreen"
                            src="./home.png"
                            width="600px"
                            height="auto"
                        />
                    </Box>
                    <Box width="40%">
                        <Typography variant="h5" color="#9e9e9e">
                            Secure Task Management for Teams
                        </Typography>

                        <Typography fontWeight="bold" variant="h3">
                            Your Team. Aligned.
                        </Typography>

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
                            <Link style={{ color: "white" }} to={"/app"}>
                                {" "}
                                Get started
                            </Link>
                        </button>
                    </Box>
                </Box>
            </Box>
            <Container
                component={"section"}
                id="features"
                sx={{
                    minHeight: "100vh",
                }}
            >
                <Typography variant="h5" color="#9e9e9e">
                    Task Management with Taskboard
                </Typography>
                <Typography fontWeight="bold" variant="h2">
                    Projects That Work.
                </Typography>
                <Typography color="#9e9e9e" variant="h6">
                    Wheather you are managing your next big project or
                    streamlining task management for your team, it's essential
                    to have an overview of who is responsible for what and when.
                    Taskboard offers a solution that allows you to manage tasks
                    in a visually pleasing and customizable way, fitting to your
                    unique requirements.
                </Typography>

                <Box sx={{ marginTop: "100px", display: "flex" }}>
                    <Box width="30%">
                        {features2.map((feature, indx) => (
                            <React.Fragment key={indx}>
                                <ListItemButton
                                    onClick={() => setValue(feature)}
                                >
                                    <ListItemIcon>
                                        {icons[feature.icon]({
                                            width: "30px",
                                            height: "30px",
                                            color:
                                                value.title === feature.title
                                                    ? "#3268c5"
                                                    : "",
                                        })}
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography
                                            variant="h6"
                                            fontWeight={"bold"}
                                            sx={{
                                                color:
                                                    value.title ===
                                                    feature.title
                                                        ? "#3268c5"
                                                        : "#9e9e9e",
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color:
                                                    value.title ===
                                                    feature.title
                                                        ? "#3268c5"
                                                        : "#9e9e9e",
                                            }}
                                        >
                                            {feature.subtitle}
                                        </Typography>
                                    </ListItemText>
                                </ListItemButton>
                                <Divider sx={{ margin: 1 }} />
                            </React.Fragment>
                        ))}
                    </Box>
                    <Box width="70%" padding={"15px"}>
                        <img
                            src={value.image}
                            alt="home screen "
                            width="100%"
                            height="auto"
                        />
                    </Box>
                </Box>
            </Container>
            <Container>
                <Divider sx={{ margin: "40px" }} />
            </Container>

            <Container
                component={"section"}
                id="features2"
                sx={{
                    minHeight: "100vh",
                }}
            >
                <Typography variant="h5" color="#9e9e9e">
                    The Need for Task Management
                </Typography>
                <Typography fontWeight="bold" variant="h2">
                    It’s Time to Get Organized.
                </Typography>
                <Typography color="#9e9e9e" variant="h6">
                    Introducing our revolutionary task management app, designed
                    to help you stay organized and on top of your workload like
                    never before. With a sleek and intuitive interface, our app
                    makes it easy to keep track of all your tasks, deadlines,
                    and projects, no matter how busy you are.
                </Typography>

                <Box
                    sx={{
                        marginTop: "60px",
                        marginBottom: "60px",
                        display: "flex",
                        flexWrap: { md: "no-wrap" },
                    }}
                >
                    {features.map((feature, index) => (
                        <div className="feature-card" key={index}>
                            <i className="feature-icon fa fa-check"></i>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-body">{feature.body}</p>
                        </div>
                    ))}
                </Box>

                <Typography color="#9e9e9e" variant="h6">
                    With our task management app, you'll be able to stay
                    organized and productive, no matter how busy your schedule
                    gets. Try it out today and see the difference it can make in
                    your work and personal life!
                </Typography>
            </Container>
            <br />
            <Box sx={{ marginTop: "40px" }}>
                <Copyright />
            </Box>
        </Box>
    );
};

export default Home;
