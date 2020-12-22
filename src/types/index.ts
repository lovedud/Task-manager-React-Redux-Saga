// Actions

export enum ItemsTypes {
    ADD_TASK = 'ADD_TASK',
    TOGGLE_TASK = 'TOGGLE_TASK',
    TOGGLE_EDIT_TASK = 'TOGGLE_EDIT_TASK',
    UPDATE_TASK = 'UPDATE_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    LOAD_REQUEST = 'LOAD_REQUEST',
    LOAD_SUCCESS = 'LOAD_SUCCESS',
    LOAD_FAILURE = 'LOAD_FAILURE'
}

// Filters

export enum VisibilityFilters {
    SHOW_ALL = 'SHOW_ALL',
    SHOW_ACTIVE = 'SHOW_ACTIVE',
    SHOW_COMPLETED = 'SHOW_COMPLETED',
    UPDATE_FILTER = 'UPDATE_FILTER'
}

export interface TodoListActionTypes {
    type: string,
    payload: Item,
    data: Item[]
}

export interface FilterActionTypes {
    type: string,
    payload: {
        filter: string
    }
}


//Data types

export interface Item {
    id: number,
    text: string,
    editing: boolean,
    complete: boolean
}


// State types

export interface ItemsState {
    readonly data: Item[]
}
export interface ApplicationState {
    tasks: ItemsState,
    filterState: string
}