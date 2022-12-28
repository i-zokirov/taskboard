import React from "react";
import { ModalProps } from "../interfaces";
import { Modal, Backdrop, Fade, Box } from "@mui/material";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    outline: "none",
    borderRadius: "10px",
};

const TransitionModal: React.FC<ModalProps> = ({ open, onClose, children }) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        ...style,
                        height: { md: 400, lg: 600 },
                        width: { md: 600, lg: 800 },
                    }}
                >
                    {children}
                </Box>
            </Fade>
        </Modal>
    );
};

export default TransitionModal;
