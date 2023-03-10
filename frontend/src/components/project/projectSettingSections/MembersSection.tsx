import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React from "react";
import { openShareProjectModal } from "../../../reduxApp/features/modals/modal-slice";
import { useAppDispatch, useAppSelector } from "../../../reduxApp/hooks";

const MembersSection = () => {
    const projectData = useAppSelector(
        (state) => state.projectSettings.projectData
    );
    const dispatch = useAppDispatch();
    const handleAdd = () => {
        dispatch(openShareProjectModal());
    };
    return (
        <Box sx={{ padding: "10px 20px 20px 20px" }}>
            <Box
                margin="10px"
                display={"flex"}
                alignItems="center"
                justifyContent={"space-between"}
            >
                <button className="btn" onClick={handleAdd}>
                    Add
                </button>
                <Typography>
                    {projectData &&
                        projectData.members &&
                        projectData.members.length}{" "}
                    Member(s)
                </Typography>
            </Box>
            <Box
                sx={{
                    background: "#eff2f5",
                    borderRadius: "10px",
                    paddingBottom: "20px",
                    minHeight: "30vh",
                }}
            >
                <Table aria-label="project members table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projectData &&
                            projectData.members &&
                            projectData.members.map((member) => (
                                <TableRow key={member._id}>
                                    <TableCell component={"th"} scope="row">
                                        <Typography variant="subtitle2">
                                            {member.name}
                                        </Typography>
                                        <Typography variant="caption">
                                            {member.email}
                                        </Typography>
                                    </TableCell>
                                    <TableCell
                                        component={"th"}
                                        scope="row"
                                        align="center"
                                    >
                                        <Typography variant="subtitle2">
                                            {projectData.owner._id ===
                                            member._id
                                                ? "Owner"
                                                : "Member"}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default MembersSection;
