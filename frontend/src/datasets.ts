import { nanoid } from "nanoid";

export const taskItemsFromBackend = [
    { id: nanoid(), title: "First task", completed: true },
    { id: nanoid(), title: "Second task", completed: false },
    { id: nanoid(), title: "Third task", completed: false },
    { id: nanoid(), title: "Fourth task", completed: false },
    { id: nanoid(), title: "Fifth task", completed: false },
];
