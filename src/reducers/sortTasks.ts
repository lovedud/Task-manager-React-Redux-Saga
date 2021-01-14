import { TasksTypes, TodoListActionTypes } from '../types';
const initialState = false;

export default function sortTasks (state = initialState, action: TodoListActionTypes) {
    switch (action.type) {
        case TasksTypes.SORT_TASKS:
            return action.payload;

        default:
            return state;
    }
}