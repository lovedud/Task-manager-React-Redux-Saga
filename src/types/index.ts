export enum actionTypes {
    ADD_TASK = 'ADD_TASK',
    SORT_TASKS = 'SORT_TASKS',
    UPDATE__PRIORITY_FILTER = 'UPDATE__PRIORITY_FILTER',
    TOGGLE_TASK = 'TOGGLE_TASK',
    TOGGLE_EDIT_TASK = 'TOGGLE_EDIT_TASK',
    UPDATE_TASK = 'UPDATE_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    LOAD_REQUEST = 'LOAD_REQUEST',
    LOAD_SUCCESS = 'LOAD_SUCCESS',
    LOAD_FAILURE = 'LOAD_FAILURE',
    CHECK_ALL = 'CHECK_ALL',
    SET_FILTERING = 'SET_FILTERING',
    SHOW_ALL = 'SHOW_ALL',
    SHOW_ACTIVE = 'SHOW_ACTIVE',
    SHOW_COMPLETED = 'SHOW_COMPLETED',
    SHOW__HIGH_PRIORITY = 'SHOW__HIGH_PRIORITY',
    SHOW__IMPORTANT_PRIORITY = 'SHOW__IMPORTANT_PRIORITY',
    SHOW__LOW_PRIORITY = 'SHOW__LOW_PRIORITY',
    UPDATE_FILTER = 'UPDATE_FILTER',
    DELETE_COMPLETED = 'DELETE_COMPLETED'
}

export interface TaskActionTypes {
    type: string,
    payload: Task,
}

export interface FilterActionTypes {
    type: string,
    payload: {
        filter: string
    }
}

export interface SortActionType {
    type: string,
    payload: boolean
}

export interface FilterActionType {
    type: string,
    payload: string
}

export interface SetFilteringActionType {
    type: string,
    payload: boolean
}

export interface SetAllCheckedActionType {
    type: string,
    payload: boolean
}

export interface TodoListActionTypes {
    type: string,
    payload: Task[],
}

//Data types

export interface Task {
    id: number,
    text: string,
    editing: boolean,
    complete: boolean,
    priority: string,
}

// State types

export interface ApplicationState {
    tasks: Task[],
    filterState: string,
    sortTasks: boolean,
    filtering: boolean,
    priorityFilter: string,
    isAllChecked: boolean
}