import { TasksTypes, TodoListActionTypes } from '../types';
const initialState = '';

export default function priorityFilter (state = initialState, action: TodoListActionTypes) {
    switch (action.type) {
        case TasksTypes.UPDATE__PRIORITY_FILTER:
            return action.payload;

        default:
            return state;
    }
}