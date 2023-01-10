import React, { useRef, useState } from "react";
import {
    Box,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Fade,
    Paper,
    Popper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FaceIcon from "@mui/icons-material/Face";
import Face2Icon from "@mui/icons-material/Face2";
import Face4Icon from "@mui/icons-material/Face4";
import { useAppSelector, useCreateSection } from "../../../reduxApp/hooks";
const LastColumn = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [showInput, setShowInput] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const addSectionRef = useRef<any>(null);
    const createSection = useCreateSection();

    const openPopper = Boolean(anchorEl);

    const handleAddSectionBtnClick = () => {
        setShowInput((prev) => !prev);
    };

    const closePopper = () => {
        setAnchorEl(null);
    };
    const handleInputBlur = () => {
        closePopper();
        if (inputRef.current && inputRef.current.value) {
            createSection({
                section: { title: inputRef.current.value },
                token: "",
            });
        }
        setShowInput((prev) => !prev);
    };
    return (
        <React.Fragment>
            {/* <Popper
                open={openPopper}
                anchorEl={anchorEl}
                placement={"top-end"}
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                            <Typography sx={{ p: 2 }}>
                                Click here to add sections to your project board
                                to get started.
                            </Typography>
                        </Paper>
                    </Fade>
                )}
            </Popper> */}
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
                    {showInput ? (
                        <input
                            type="text"
                            style={{
                                width: "100%",
                                fontSize: "16px",
                                padding: "12px",
                            }}
                            placeholder="Start typing..."
                            autoFocus
                            ref={inputRef}
                            id={"New Section input"}
                            onBlur={handleInputBlur}
                        />
                    ) : (
                        <ListItemButton
                            onClick={handleAddSectionBtnClick}
                            ref={addSectionRef}
                        >
                            <ListItemIcon>
                                <AddIcon sx={{ color: "#3268c5" }} />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography sx={{ color: "#3268c5" }}>
                                    Add section
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    )}
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
                    textAlign={"center"}
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
