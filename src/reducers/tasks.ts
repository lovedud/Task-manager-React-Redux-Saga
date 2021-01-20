import {ApplicationState, TasksTypes, TodoListActionTypes} from '../types';

const initialState: ApplicationState = {
    tasks: {
        data: []
    },
    filterState: "SHOW_ALL",
    sortTasks: false,
    filtering: false,
    priorityFilter: '',
};

export default (state = initialState, action: TodoListActionTypes) => {
    switch (action.type) {
        case TasksTypes.ADD_TASK:
            return {
                ...state,
                tasks: {
                    data: [
                        ...state.tasks.data,
                        {
                            id: state.tasks.data.length + 1,
                            text: action.payload.text,
                            editing: action.payload.editing,
                            complete: action.payload.complete,
                            priority: action.payload.priority,
                        },
                    ],
                }

            };

        case TasksTypes.SORT_TASKS:
            return {
                ...state,
                tasks: {
                    data: state.tasks.data.sort((a, b) =>  a.priority > b.priority ? 1 : -1 )
                }
            };

        case TasksTypes.UPDATE__PRIORITY_FILTER:
            return {
                ...state,
                priorityFilter: action.payload
            };

        case TasksTypes.SET_FILTERING:
            return {
                ...state,
                filtering: action.payload
            };

        case TasksTypes.TOGGLE_TASK:
            return {
                ...state,
                tasks: {
                    data: state.tasks.data.map((item) => ((item.id === action.payload.id)
                        ? { ...item, complete: action.payload.complete }
                        : item)),
                }
            };

        case TasksTypes.TOGGLE_EDIT_TASK:
            return {
                ...state,
                tasks: {
                    data: state.tasks.data.map((item) => ((item.id === action.payload.id)
                        ? {...item, editing: !item.editing}
                        : item)),
                }
            };

        case TasksTypes.UPDATE_TASK:
            return {
                ...state,
                tasks: {
                    data: state.tasks.data.map((item) => ((item.id === action.payload.id)
                        ? {...item, text: action.payload.text}
                        : item)),
                }
            };

        case TasksTypes.REMOVE_TASK:
            return {
                ...state,
                tasks: {
                    data: state.tasks.data.filter((item) => item.id !== action.payload.id),
                }
            };

        case TasksTypes.LOAD_REQUEST:
            return { ...state };

        case TasksTypes.LOAD_SUCCESS:
            return {
                ...state,
                tasks: {
                    data: action.data,
                }
            };

        case TasksTypes.LOAD_FAILURE:
            return {
                ...state,
                tasks: {
                    data: [],
                }
            };

        default:
            return state;
    }
};