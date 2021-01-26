import { actionTypes, Task } from '../types';

export const addTask = (data: { text: string, priority: string }) => ({
    type: actionTypes.ADD_TASK,
    payload: data,
});

export const toggleTask = (id: number, complete: boolean) => ({
    type: actionTypes.TOGGLE_TASK,
    payload: {
        id,
        complete
    },
});

export const toggleEditTask = (id: number, editing: boolean) => ({
    type: actionTypes.TOGGLE_EDIT_TASK,
    payload: {
        id,
        editing,
    },
});

export const updateTask = (id: number, text: string) => ({
    type: actionTypes.UPDATE_TASK,
    payload: {
        id,
        text,
    },
});

export const removeTask = (id: number) => ({
    type: actionTypes.REMOVE_TASK,
    payload: {
        id,
    },
});

export const sortTasks = (prop: boolean) => ({
    type: actionTypes.SORT_TASKS,
    payload: prop,
})

export const loadRequest = () => ({
    type: actionTypes.LOAD_REQUEST,
});

export const loadSuccess = (data: Task[]) => ({
    type: actionTypes.LOAD_SUCCESS,
    payload: data,
});

export const loadFailure = () => ({
    type: actionTypes.LOAD_FAILURE,
});

export const checkAll = (isAllChecked: boolean) => ({
    type: actionTypes.CHECK_ALL,
    payload: isAllChecked,
})

export const setFiltering = (filtering: boolean) => ({
    type: actionTypes.SET_FILTERING,
    payload: filtering
})

export const updatePriority = (prior: string) => ({
    type: actionTypes.UPDATE__PRIORITY_FILTER,
    payload: prior
})

export const deleteCompleted = () => ({
    type: actionTypes.DELETE_COMPLETED,
})
