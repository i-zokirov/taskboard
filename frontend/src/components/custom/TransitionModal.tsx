import React from "react";
import { ModalProps } from "../../interfaces";
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

const TransitionModal: React.FC<ModalProps> = ({
    open,
    onClose,
    children,
    height,
    width,
}) => {
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
                        minHeight: height,
                        width,
                    }}
                >
                    {children}
                </Box>
            </Fade>
        </Modal>
    );
};

export default TransitionModal;
