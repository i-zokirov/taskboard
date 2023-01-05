import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { Box, IconButton, Typography, Tooltip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import { ColumnHeaderProps } from "../interfaces";
import ColumnIconSelectorMenu from "./ColumnIconSelectorMenu";
import ColumnMenu from "./ColumnMenu";
import { icons } from "../assets/icons";

const ColumnHeader: FunctionComponent<ColumnHeaderProps> = (props) => {
    const { columnId, column } = props;
    const [newInput, setNewInput] = useState("");
    const [columnInput, setColumnInput] = useState<{
        id: null | string;
        show: boolean;
    }>({ id: null, show: false });
    const [showEditIcon, setShowEditIcon] = useState<{
        id: null | string;
        state: boolean;
    }>({ id: null, state: false });

    const [showcurrentColumnIconMenu, setShowCurrentColumnIconMenu] = useState<{
        id: null | string;
        state: boolean;
    }>({ id: null, state: false });

    const [showcurrentColumnMenu, setShowCurrentColumnMenu] = useState<{
        id: null | string;
        state: boolean;
    }>({ id: null, state: false });

    const [columnMenuAnchorEl, setColumnMenuAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const [columnIconAnchorEl, setColumnIconAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const openColumnIconMenu = Boolean(columnIconAnchorEl);
    const openColumnMenu = Boolean(columnMenuAnchorEl);

    const handleCloseColumnIconMenu = () => {
        setColumnIconAnchorEl(null);
        setShowCurrentColumnIconMenu({ id: null, state: false });
    };

    const handleCloseColumnMenu = () => {
        setColumnMenuAnchorEl(null);
        setShowCurrentColumnMenu({ id: null, state: false });
    };

    const handleColumnIconClick = (
        id: string,
        event: React.MouseEvent<HTMLElement>
    ) => {
        setShowCurrentColumnIconMenu({ id, state: true });
        handleOpenColumnMenu(event);
    };
    const handleOpenColumnMenu = (event: React.MouseEvent<HTMLElement>) => {
        setColumnIconAnchorEl(event.currentTarget);
    };

    const handleMouseOver = (id: string) => {
        setShowEditIcon({ id, state: true });
    };

    const handleMouseLeave = () => {
        setShowEditIcon({ id: null, state: false });
    };
    const showColumnInput = (id: string, inputValue: string) => {
        setColumnInput({ id, show: true });
        setNewInput(inputValue);
    };
    const handleNewInput = (event: any) => {
        setColumnInput({ id: null, show: false });
        // handle new column name with newInput

        setNewInput("");
    };
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNewInput(e.target.value);
    };

    const handleColumnMenuClick = (
        id: string,
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        setShowCurrentColumnMenu({ id, state: true });
        setColumnMenuAnchorEl(e.currentTarget);
    };
    return (
        <React.Fragment>
            {showcurrentColumnIconMenu.state &&
                showcurrentColumnIconMenu.id === columnId && (
                    <ColumnIconSelectorMenu
                        open={openColumnIconMenu}
                        anchorEl={columnIconAnchorEl}
                        handleClose={handleCloseColumnIconMenu}
                    />
                )}

            {showcurrentColumnMenu.state &&
                showcurrentColumnMenu.id === columnId && (
                    <ColumnMenu
                        open={openColumnMenu}
                        anchorEl={columnMenuAnchorEl}
                        handleClose={handleCloseColumnMenu}
                    />
                )}
            <Box
                onMouseOver={() => handleMouseOver(columnId)}
                onMouseLeave={handleMouseLeave}
                sx={{
                    padding: "10px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: column.color,
                }}
                width={"100%"}
            >
                <Box display="flex" alignItems={"center"} width={"60%"}>
                    <IconButton
                        onClick={(event: React.MouseEvent<HTMLElement>) =>
                            handleColumnIconClick(columnId, event)
                        }
                    >
                        {icons[column.icon]({ color: "white" })}
                    </IconButton>
                    {columnInput.id === columnId && columnInput.show ? (
                        <input
                            type="text"
                            onBlur={handleNewInput}
                            onChange={onInputChange}
                            value={newInput}
                            autoFocus
                        />
                    ) : (
                        <Typography color={"white"}>{column.title}</Typography>
                    )}
                </Box>

                <Box width={"40%"} justifyContent="flex-end" display="flex">
                    {showEditIcon.id === columnId && showEditIcon.state && (
                        <Tooltip title="Edit column name">
                            <IconButton
                                onClick={() =>
                                    showColumnInput(columnId, column.name)
                                }
                            >
                                <EditIcon
                                    sx={{
                                        color: "white",
                                        height: "16px",
                                        width: "16px",
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    )}

                    <Tooltip title="Section Menu">
                        <IconButton
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                                handleColumnMenuClick(columnId, e)
                            }
                        >
                            <MoreHorizIcon sx={{ color: "white" }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default ColumnHeader;
