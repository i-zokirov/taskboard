import React from "react";
import { Box } from "@mui/material";
import { ColumnProps } from "../../../interfaces";

const light = "#eef1f5";
const dark = "#e7ebf0";
const Column: React.FC<ColumnProps> = (props) => {
    return (
        <Box
            sx={{
                width: props.width,
                height: "100vh",
                overflow: "hidden",
                background:
                    props.index && (props.index + 1) % 2 === 0 ? light : dark,
            }}
        >
            {props.children}
        </Box>
    );
};

export default Column;
