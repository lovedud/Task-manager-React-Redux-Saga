import { Task, TasksTypes } from '../types';
import {resolveSrv} from "dns";

export const addTask = (data: { text: string, priority: string }) => ({
    type: TasksTypes.ADD_TASK,
    payload: data,
});

export const toggleTask = (id: number, complete: boolean) => ({
    type: TasksTypes.TOGGLE_TASK,
    payload: {
        id,
        complete
    },
});

export const toggleEditTask = (id: number, editing: boolean) => ({
    type: TasksTypes.TOGGLE_EDIT_TASK,
    payload: {
        id,
        editing,
    },
});

export const updateTask = (id: number, text: string) => ({
    type: TasksTypes.UPDATE_TASK,
    payload: {
        id,
        text,
    },
});

export const removeTask = (id: number) => ({
    type: TasksTypes.REMOVE_TASK,
    payload: {
        id,
    },
});

export const sortTasks = (prop: string) => ({
    type: TasksTypes.SORT_TASKS,
    payload: prop,
})

export const loadRequest = () => ({
    type: TasksTypes.LOAD_REQUEST,
});

export const loadSuccess = (data: Task[]) => ({
    type: TasksTypes.LOAD_SUCCESS,
    data,
});

export const loadFailure = () => ({
    type: TasksTypes.LOAD_FAILURE,
});