import { Box, Alert } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../reduxApp/hooks";

const Notification: React.FC = () => {
    const { notifications } = useAppSelector(
        (state) => state.notificationsystem
    );

    if (notifications.length) {
        return (
            <Box
                sx={{
                    zIndex: 1000,
                    position: "absolute",
                    top: "75px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {notifications.map((notification, indx) => (
                    <React.Fragment key={indx}>
                        <Alert variant="filled" severity={notification.type}>
                            {notification.message}
                        </Alert>
                        <br />
                    </React.Fragment>
                ))}
            </Box>
        );
    } else {
        return <></>;
    }
};

export default Notification;
