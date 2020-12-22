import { Item, ItemsTypes } from '../types';

export const addTask = (data: Item) => ({
    type: ItemsTypes.ADD_TASK,
    payload: data,
});

export const toggleTask = (id: number, complete: boolean) => ({
    type: ItemsTypes.TOGGLE_TASK,
    payload: {
        id,
        complete
    },
});

export const toggleEditTask = (id: number, editing: boolean) => ({
    type: ItemsTypes.TOGGLE_EDIT_TASK,
    payload: {
        id,
        editing,
    },
});

export const updateTask = (id: number, text: string) => ({
    type: ItemsTypes.UPDATE_TASK,
    payload: {
        id,
        text,
    },
});

export const removeTask = (id: number) => ({
    type: ItemsTypes.REMOVE_TASK,
    payload: {
        id,
    },
});

export const loadRequest = () => ({
    type: ItemsTypes.LOAD_REQUEST,
});

export const loadSuccess = (data: Item[]) => ({
    type: ItemsTypes.LOAD_SUCCESS,
    data,
});

export const loadFailure = () => ({
    type: ItemsTypes.LOAD_FAILURE,
});