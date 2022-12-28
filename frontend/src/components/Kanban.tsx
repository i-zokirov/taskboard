import React, { useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { Box, Stack } from "@mui/material";
import TaskCard from "./Card";

import { kanbancolumns } from "../config";
import { StrictModeDroppable } from "./StrictModeDroppable";
import Column from "./Column";
import ColumnHeader from "./ColumnHeader";
import LastColumn from "./LastColumn";

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

const Kanban: React.FC = () => {
    const [columns, setColumns] = useState(kanbancolumns);
    const columnWidth = `${100 / Object.entries(columns).length + 1}%`;
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
                    <Column
                        columnId={columnId}
                        width={columnWidth}
                        index={index}
                        key={columnId}
                    >
                        <ColumnHeader columnId={columnId} column={column} />
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
                    </Column>
                ))}
            </DragDropContext>
            <Column
                width={`${(100 / Object.entries(columns).length + 1) / 1.7}%`}
                index={Object.entries(columns).length}
            >
                <LastColumn />
            </Column>
        </Stack>
    );
};

export default Kanban;
