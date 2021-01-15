// Actions

import {truncate} from "fs";

export enum TasksTypes {
    ADD_TASK = 'ADD_TASK',
    TOGGLE_TASK = 'TOGGLE_TASK',
    TOGGLE_EDIT_TASK = 'TOGGLE_EDIT_TASK',
    UPDATE_TASK = 'UPDATE_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    LOAD_REQUEST = 'LOAD_REQUEST',
    LOAD_SUCCESS = 'LOAD_SUCCESS',
    LOAD_FAILURE = 'LOAD_FAILURE',
    CHECK_ALL = 'CHECK_ALL',
    SORT_TASKS = 'SORT_TASKS',
    UPDATE__PRIORITY_FILTER = 'UPDATE__PRIORITY_FILTER',
    SET_FILTERING = 'SET_FILTERING',
}

// Filters

export enum VisibilityFilters {
    SHOW_ALL = 'SHOW_ALL',
    SHOW_ACTIVE = 'SHOW_ACTIVE',
    SHOW_COMPLETED = 'SHOW_COMPLETED',
    SHOW__HIGH_PRIORITY = 'SHOW__HIGH_PRIORITY',
    SHOW__IMPORTANT_PRIORITY = 'SHOW__IMPORTANT_PRIORITY',
    SHOW__LOW_PRIORITY = 'SHOW__LOW_PRIORITY',
    UPDATE_FILTER = 'UPDATE_FILTER'
}

export interface TodoListActionTypes {
    type: string,
    payload: Task,
    data: Task[],
    checkedAll: boolean,
}

export interface FilterActionTypes {
    type: string,
    payload: {
        filter: string
    }
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

export interface TasksState {
    readonly data: Task[],
}
export interface ApplicationState {
    tasks: TasksState,
    filterState: string,
    sortTasks: boolean,
    filtering: boolean,
    priorityFilter: string,
}