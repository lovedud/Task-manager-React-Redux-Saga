import { TasksState, TasksTypes, TodoListActionTypes } from '../types';

const initialState: TasksState = {
    data: []
};

export default (state = initialState, action: TodoListActionTypes): TasksState => {
    switch (action.type) {
        case TasksTypes.ADD_TASK:
            return {
                data: [
                    ...state.data,
                    {
                        id: state.data.length,
                        text: action.payload.text,
                        editing: action.payload.editing,
                        complete: action.payload.complete,
                    },
                ],
            };

        case TasksTypes.TOGGLE_TASK:
            return {
                data: state.data.map((item) => ((item.id === action.payload.id)
                    ? { ...item, complete: action.payload.complete }
                    : item)),
            };

        case TasksTypes.TOGGLE_EDIT_TASK:
            return {
                data: state.data.map((item) => ((item.id === action.payload.id)
                    ? { ...item, editing: !item.editing }
                    : item)),
            };

        case TasksTypes.UPDATE_TASK:
            return {
                data: state.data.map((item) => ((item.id === action.payload.id)
                    ? { ...item, text: action.payload.text }
                    : item)),
            };

        case TasksTypes.REMOVE_TASK:
            return {
                data: state.data.filter((item) => item.id !== action.payload.id),
            };

        case TasksTypes.LOAD_REQUEST:
            return { ...state };

        case TasksTypes.LOAD_SUCCESS:
            return {
                data: action.data,
            };

        case TasksTypes.LOAD_FAILURE:
            return {
                data: [],
            };

        default:
            return state;
    }
};