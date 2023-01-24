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
            const columns: {
                [x: string]: KanbanColumn;
            } = {};
            for (let section of action.payload.sections) {
                const column: KanbanColumn = {
                    ...section,
                    taskItems: action.payload.tasks.filter(
                        (task) =>
                            task.project?._id === section.project._id &&
                            task.section._id === section._id
                    ),
                };
                columns[section._id] = column;
            }
            state.columns = columns;
        },
        addColumnToKanban: (
            state,
            action: PayloadAction<{ section: ISection }>
        ) => {
            state.columns[action.payload.section._id] = {
                ...action.payload.section,
                taskItems: [],
            };
        },
        updateColumnSectionInKanban: (
            state,
            action: PayloadAction<{ section: ISection }>
        ) => {
            state.columns[action.payload.section._id] = {
                ...action.payload.section,
                taskItems: state.columns[action.payload.section._id].taskItems,
            };
        },
        updateTaskInKanbanBoard: (
            state,
            action: PayloadAction<{ task: ITask }>
        ) => {
            const index = state.columns[
                action.payload.task.section._id
            ].taskItems.findIndex((el) => el._id === action.payload.task._id);
            if (index >= 0)
                state.columns[action.payload.task.section._id].taskItems[
                    index
                ] = action.payload.task;
        },
        removeTaskInKanbanBoard: (state, action: PayloadAction<ITask>) => {
            const task = action.payload;
            const sectionData = state.columns[task.section._id].taskItems;
            state.columns[task.section._id].taskItems = sectionData.filter(
                (el) => el._id !== task._id
            );
        },
        markColumnTasksCompleted: (state, action: PayloadAction<string>) => {
            state.columns[action.payload].taskItems = state.columns[
                action.payload
            ].taskItems.map((task) => {
                return { ...task, completed: true };
            });
        },

        addTaskToKanbanBoard: (
            state,
            action: PayloadAction<{ task: ITask; sectionId: string }>
        ) => {
            if (
                !state.columns[action.payload.sectionId].taskItems.some(
                    (task) => task._id === action.payload.task._id
                )
            )
                state.columns[action.payload.sectionId].taskItems.push(
                    action.payload.task
                );
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
                if (removed) {
                    removed.section._id =
                        action.payload.destination.droppableId;
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
                }
            } else {
                const column = state.columns[action.payload.source.droppableId];
                const copiedItems = [...column.taskItems];
                const [removed] = copiedItems.splice(
                    action.payload.source.index,
                    1
                );
                if (removed) {
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
            }
        },
    },
});

export const {
    setUpKanban,
    moveTask,
    updateTaskInKanbanBoard,
    addTaskToKanbanBoard,
    addColumnToKanban,
    updateColumnSectionInKanban,
    markColumnTasksCompleted,
    removeTaskInKanbanBoard,
} = kanbanSlice.actions;
