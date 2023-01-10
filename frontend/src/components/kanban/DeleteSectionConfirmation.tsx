import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { ModalProps } from "../../interfaces";
import { useDeleteSection } from "../../reduxApp/hooks";
import TransitionModal from "../custom/TransitionModal";

const DeleteSectionConfirmation: React.FC<ModalProps> = (props) => {
    const { open, onClose, column, closeMenu } = props;

    const deleteSection = useDeleteSection();
    const cancelHandler = () => {
        onClose();
        closeMenu();
    };

    const deletHandler = () => {
        // delete section
        deleteSection({ token: "", sectionId: column._id });
        onClose();
        closeMenu();
    };

    return (
        <TransitionModal open={open} onClose={onClose}>
            <Box
                padding={"20px"}
                height={"200px"}
                width={"400px"}
                display="flex"
                justifyContent={"space-between"}
                flexDirection="column"
            >
                <Box>
                    <Typography fontWeight={"bold"} variant="h6">
                        Delete Section
                    </Typography>
                    <br />
                    <Typography>
                        {column.taskItems.length} tasks in this section will be
                        deleted.
                    </Typography>
                </Box>
                <Divider />
                <Box
                    display={"flex"}
                    justifyContent="flex-end"
                    alignItems={"center"}
                >
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{ marginRight: "10px" }}
                        onClick={cancelHandler}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={deletHandler}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
        </TransitionModal>
    );
};

export default DeleteSectionConfirmation;
