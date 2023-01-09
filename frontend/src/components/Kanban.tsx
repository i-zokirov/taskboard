import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { Box, IconButton, LinearProgress, Stack, Tooltip } from "@mui/material";
import TaskCard from "./Card";
import { StrictModeDroppable } from "./StrictModeDroppable";
import Column from "./Column";
import ColumnHeader from "./ColumnHeader";
import LastColumn from "./LastColumn";
import { icons } from "../assets/icons";
import ColumnNoTasksPlaceHolder from "./ColumnNoTasksPlaceHolder";
import TaskInputCard from "./TaskInputCard";
import { useAppDispatch, useAppSelector } from "../reduxApp/hooks";
import socket from "../socket";
import {
    tasksRequest,
    tasksRequestSuccess,
    updateSingleTaskInStore,
} from "../reduxApp/features/tasks/tasks-slice";

import {
    moveTask,
    setUpKanban,
} from "../reduxApp/features/kanban/kanban-slice";

const Kanban: React.FC = () => {
    const [showInputForCol, setShowInputForCol] = useState<{
        colId: null | string;
        show: boolean;
    }>({ colId: null, show: false });

    const kanban = useAppSelector((state) => state.kanban);
    const columnsLength = Object.entries(kanban.columns).length;
    const columnWidth = columnsLength < 4 ? `${100 / columnsLength}vw` : `22vw`;

    const { projectData } = useAppSelector((state) => state.currentProject);
    const tasks = useAppSelector((state) => state.tasks);
    const token = useAppSelector((state) => state.auth.userData?.token);

    const dispatch = useAppDispatch();
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const { source, destination } = result;
        dispatch(moveTask({ source, destination }));
        const payload = {
            token,
            taskId: result.draggableId,
            updates: { section: result.destination.droppableId },
        };
        socket.emit("tasks:update", payload, (response) => {
            if (response.task) {
                // update task in redux
                dispatch(
                    updateSingleTaskInStore({
                        projectId: projectData!._id,
                        task: response.task,
                    })
                );
            }
        });
    };
    useEffect(() => {
        if (projectData) {
            if (tasks.data[projectData._id]) {
                // build kanban
                const sections = projectData.sections!.map((section) => {
                    const project = projectData;

                    return { ...section, project };
                });

                dispatch(
                    setUpKanban({
                        sections,
                        tasks: tasks.data[projectData._id],
                    })
                );
            } else {
                dispatch(tasksRequest());
                socket.emit(
                    "tasks:read",
                    { token, projectId: projectData._id },
                    (response) => {
                        if (response.tasks) {
                            dispatch(
                                tasksRequestSuccess({
                                    project: projectData._id,
                                    tasks: response.tasks,
                                })
                            );
                            const sections = projectData.sections!.map(
                                (section) => {
                                    const project = projectData;

                                    return { ...section, project };
                                }
                            );
                            dispatch(
                                setUpKanban({
                                    sections,
                                    tasks: response.tasks,
                                })
                            );
                        }
                    }
                );
            }
        }
    }, [projectData]);
    const hideInputForCol = () => {
        setShowInputForCol({ colId: null, show: false });
    };

    if (tasks.loading) {
        return <LinearProgress color="secondary" />;
    } else {
        return (
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems={"flex-start"}
                spacing={0}
            >
                <DragDropContext onDragEnd={onDragEnd}>
                    {Object.entries(kanban.columns).map(
                        ([columnId, column], index) => (
                            <Column
                                columnId={columnId}
                                width={columnWidth}
                                index={index}
                                key={columnId}
                            >
                                <ColumnHeader
                                    columnId={columnId}
                                    column={column}
                                />
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
                                                {column.taskItems.map(
                                                    (item, indx) => (
                                                        <Draggable
                                                            key={item._id}
                                                            draggableId={
                                                                item._id
                                                            }
                                                            index={indx}
                                                        >
                                                            {(
                                                                provided,
                                                                snapshot
                                                            ) => {
                                                                return (
                                                                    <TaskCard
                                                                        task={
                                                                            item
                                                                        }
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
                                                    )
                                                )}
                                                {showInputForCol.show &&
                                                showInputForCol.colId ===
                                                    columnId ? (
                                                    <TaskInputCard
                                                        sectionId={columnId}
                                                        hideInput={
                                                            hideInputForCol
                                                        }
                                                    />
                                                ) : (
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent:
                                                                " center",
                                                        }}
                                                    >
                                                        <Tooltip title="Add task">
                                                            <IconButton
                                                                sx={{
                                                                    background:
                                                                        "#fff",
                                                                }}
                                                                onClick={() =>
                                                                    setShowInputForCol(
                                                                        {
                                                                            colId: columnId,
                                                                            show: true,
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                {icons["add"]({
                                                                    width: "20px",
                                                                    height: "20px",
                                                                })}
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                )}
                                                {column.taskItems.length ===
                                                    0 && (
                                                    <ColumnNoTasksPlaceHolder />
                                                )}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </StrictModeDroppable>
                                </Box>
                            </Column>
                        )
                    )}
                </DragDropContext>
                <Column
                    width={`${
                        projectData?.sections?.length
                            ? (100 / Object.entries(kanban.columns).length +
                                  1) /
                              1.7
                            : 100
                    }%`}
                    index={Object.entries(kanban.columns).length}
                >
                    <LastColumn />
                </Column>
            </Stack>
        );
    }
};

export default Kanban;
