import { TasksTypes, TodoListActionTypes } from '../types';
const initialState = false;

export default function filtering (state = initialState, action: TodoListActionTypes) {
    switch (action.type) {
        case TasksTypes.SET_FILTERING:
            return action.payload;

        default:
            return state;
    }
}