import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ISection, ITask, KanbanColumn } from "../../../types";

interface KanbanState {
    columns: {
        [x: string]: KanbanColumn;
    };
}

const initialState: KanbanState = {
    columns: {},
};

export const kanbanSlice = createSlice({
    name: "kanban",
    initialState,
    reducers: {
        setUpKanban: (
            state,
            action: PayloadAction<{ sections: ISection[]; tasks: ITask[] }>
        ) => {
            console.log(action);
            const columns: {
                [x: string]: KanbanColumn;
            } = {};
            for (let section of action.payload.sections) {
                const column: KanbanColumn = {
                    ...section,
                    taskItems: action.payload.tasks.filter(
                        (task) =>
                            task.project?._id === section.project._id &&
                            task.section === section._id
                    ),
                };
                columns[section._id] = column;
            }
            state.columns = columns;
        },
        moveTask: (
            state,
            action: PayloadAction<{
                source: { droppableId: string; index: number };
                destination: { droppableId: string; index: number };
            }>
        ) => {
            if (
                action.payload.source.droppableId !==
                action.payload.destination.droppableId
            ) {
                const sourceColumn =
                    state.columns[action.payload.source.droppableId];
                const destinationColumn =
                    state.columns[action.payload.destination.droppableId];

                const sourceTaskItems = [...sourceColumn.taskItems];
                const destinationTaskItems = [...destinationColumn.taskItems];

                const [removed] = sourceTaskItems.splice(
                    action.payload.source.index,
                    1
                );
                destinationTaskItems.splice(
                    action.payload.destination.index,
                    0,
                    removed
                );

                state.columns[action.payload.source.droppableId] = {
                    ...sourceColumn,
                    taskItems: sourceTaskItems,
                };

                state.columns[action.payload.destination.droppableId] = {
                    ...destinationColumn,
                    taskItems: destinationTaskItems,
                };
            } else {
                const column = state.columns[action.payload.source.droppableId];
                const copiedItems = [...column.taskItems];
                const [removed] = copiedItems.splice(
                    action.payload.source.index,
                    1
                );
                copiedItems.splice(
                    action.payload.destination.index,
                    0,
                    removed
                );
                state.columns[action.payload.source.droppableId] = {
                    ...column,
                    taskItems: copiedItems,
                };
            }
        },
    },
});

export const { setUpKanban, moveTask } = kanbanSlice.actions;
