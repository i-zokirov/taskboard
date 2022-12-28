import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { Box, Stack, Typography, IconButton, Tooltip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import TaskCard from "./Card";

import { kanbancolumns } from "../config";
import { StrictModeDroppable } from "./StrictModeDroppable";

const onDragEnd = (
    result: DropResult,
    columns: any,
    setColumns: (_: any) => void
) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destinationColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.taskItems];
        const destinationItems = [...destinationColumn.taskItems];
        const [removed] = sourceItems.splice(source.index, 1);
        destinationItems.splice(destination.index, 0, removed);

        setColumns((prev: any) => {
            return {
                ...prev,
                [source.droppableId]: {
                    ...sourceColumn,
                    taskItems: sourceItems,
                },
                [destination.droppableId]: {
                    ...destinationColumn,
                    taskItems: destinationItems,
                },
            };
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.taskItems];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems,
            },
        });
    }
};

const light = "#eef1f5";
const dark = "#e7ebf0";

const Kanban: React.FC = () => {
    const [showEditIcon, setShowEditIcon] = useState(false);
    const [columns, setColumns] = useState(kanbancolumns);

    const handleMouseOver = () => {
        setShowEditIcon(true);
    };

    const handleMouseLeave = () => {
        setShowEditIcon(false);
    };
    return (
        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems={"flex-start"}
            spacing={0}
        >
            <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => (
                    <Box
                        key={columnId}
                        sx={{
                            width: `${100 / Object.entries(columns).length}vw`,
                            height: "100vh",
                            overflow: "hidden",
                            background: index % 2 === 0 ? light : dark,
                        }}
                    >
                        <Box
                            onMouseOver={handleMouseOver}
                            onMouseLeave={handleMouseLeave}
                            sx={{
                                padding: "10px",
                                height: "50px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: column.color,
                            }}
                        >
                            <Box display="flex" alignItems={"center"}>
                                <IconButton>{column.icon}</IconButton>
                                <Typography color={"white"}>
                                    {column.name}
                                </Typography>
                            </Box>

                            <Box>
                                {showEditIcon && (
                                    <Tooltip title="Edit column name">
                                        <IconButton>
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

                                <Tooltip title="Selection Menu">
                                    <IconButton>
                                        <MoreHorizIcon
                                            sx={{ color: "white" }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>

                        <Box sx={{ padding: "10px 5px" }}>
                            <StrictModeDroppable
                                droppableId={columnId}
                                key={columnId}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        style={{ minHeight: "90vh" }}
                                    >
                                        {column.taskItems.map((item, indx) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={indx}
                                            >
                                                {(provided, snapshot) => {
                                                    return (
                                                        <TaskCard
                                                            task={item}
                                                            completed={
                                                                item.completed
                                                            }
                                                            innerRef={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        />
                                                    );
                                                }}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </StrictModeDroppable>
                        </Box>
                    </Box>
                ))}
            </DragDropContext>
        </Stack>
    );
};

export default Kanban;
