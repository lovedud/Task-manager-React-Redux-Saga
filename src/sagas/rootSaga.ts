import { all, takeLatest } from 'redux-saga/effects';
import { TasksTypes } from '../types';
import {
    addTask,
    deleteRequest,
    load,
    toggleTask,
    toggleEditTask,
    updateTask,
    checkAll
} from './sagas';

export default function* rootSaga() {
    return yield all([
        takeLatest(TasksTypes.LOAD_REQUEST, load),
        takeLatest(TasksTypes.ADD_TASK, addTask),
        takeLatest(TasksTypes.TOGGLE_EDIT_TASK, toggleEditTask),
        takeLatest(TasksTypes.UPDATE_TASK, updateTask),
        takeLatest(TasksTypes.TOGGLE_TASK, toggleTask),
        takeLatest(TasksTypes.REMOVE_TASK, deleteRequest),
        takeLatest(TasksTypes.CHECK_ALL, checkAll),
    ]);
}