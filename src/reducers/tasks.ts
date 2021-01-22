import {
    ApplicationState,
    TaskActionTypes,
    actionTypes,
    SortActionType,
    FilterActionType,
    SetFilteringActionType,
    TodoListActionTypes
} from '../types';
import { handleActions } from 'redux-actions';

const initialState: ApplicationState = {
    tasks: [],
    filterState: "SHOW_ALL",
    sortTasks: false,
    filtering: false,
    priorityFilter: '',
};

const tasksReducer = handleActions<ApplicationState, any>({
    [actionTypes.LOAD_REQUEST]: (state: ApplicationState) => ({
        ...state
    }),

    [actionTypes.LOAD_SUCCESS]: (state: ApplicationState, action: TodoListActionTypes) => ({
        ...state,
        tasks:  action.payload,
    }),

    [actionTypes.LOAD_FAILURE]: (state: ApplicationState) => ({
        ...state,
    }),

    [actionTypes.ADD_TASK]: (state: ApplicationState, action: TaskActionTypes) => ({
        ...state,
        tasks: [
                ...state.tasks,
                {
                    id: state.tasks.length + 1,
                    text: action.payload.text,
                    editing: action.payload.editing,
                    complete: action.payload.complete,
                    priority: action.payload.priority,
                },
            ],
    }),

    [actionTypes.SORT_TASKS]: (state, action: SortActionType) => ({
        ...state,
        sortTasks: action.payload
    }),

    [actionTypes.UPDATE__PRIORITY_FILTER]: (state, action: FilterActionType) => ({
        ...state,
        priorityFilter: action.payload
    }),

    [actionTypes.SET_FILTERING]: (state: ApplicationState, action: SetFilteringActionType) => ({
        ...state,
        filtering: action.payload
    }),

    [actionTypes.TOGGLE_TASK]: (state: ApplicationState, action: TaskActionTypes) => ({
        ...state,
        tasks:  state.tasks.map((item) => ((item.id === action.payload.id)
                ? { ...item, complete: action.payload.complete }
                : item)),
    }),

    [actionTypes.TOGGLE_EDIT_TASK]: (state: ApplicationState, action: TaskActionTypes) => ({
        ...state,
        tasks: state.tasks.map((item) => ((item.id === action.payload.id)
                ? {...item, editing: !item.editing}
                : item)),
    }),

    [actionTypes.UPDATE_TASK]: (state: ApplicationState, action: TaskActionTypes) => ({
        ...state,
        tasks:  state.tasks.map((item) => ((item.id === action.payload.id)
                ? {...item, text: action.payload.text}
                : item)),
    }),

    [actionTypes.REMOVE_TASK]: (state: ApplicationState, action: TaskActionTypes) => ({
        ...state,
        tasks:  state.tasks.filter((item) => item.id !== action.payload.id),
    }),

}, initialState)

export default tasksReducer;