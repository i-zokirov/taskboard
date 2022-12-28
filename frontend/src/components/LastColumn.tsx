import React from "react";
import {
    Box,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FaceIcon from "@mui/icons-material/Face";
import Face2Icon from "@mui/icons-material/Face2";
import Face4Icon from "@mui/icons-material/Face4";
const LastColumn = () => {
    return (
        <React.Fragment>
            <Box
                sx={{
                    padding: "10px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box display="flex" alignItems={"center"}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AddIcon sx={{ color: "#3268c5" }} />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography sx={{ color: "#3268c5" }}>
                                Add section
                            </Typography>
                        </ListItemText>
                    </ListItemButton>
                </Box>
            </Box>
            <Box
                style={{ minHeight: "80vh" }}
                display={"flex"}
                flexDirection="column"
                justifyContent={"center"}
                alignItems="center"
                padding={"10px"}
            >
                <Box>
                    <Face2Icon
                        sx={{
                            padding: "2px",
                            color: "#d93651",
                            width: "40px",
                            height: "40px",
                        }}
                    />
                    <FaceIcon
                        sx={{
                            padding: "2px",
                            color: "#3268c5",
                            width: "44px",
                            height: "44px",
                        }}
                    />
                    <Face4Icon
                        sx={{
                            padding: "2px",
                            color: "#d93651",
                            width: "40px",
                            height: "40px",
                        }}
                    />
                </Box>
                <br />
                <Typography fontWeight={"bold"}>Add Members</Typography>
                <br />
                <Typography
                    variant="body2"
                    alignItems={"center"}
                    color="#9e9e9e"
                >
                    Bring your productivity to the next level and collaborate
                    with colleagues and friends
                </Typography>
                <br />
                <button className="btn btn-circular">Invite</button>
            </Box>
        </React.Fragment>
    );
};

export default LastColumn;
