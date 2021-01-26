import { all, takeLatest } from 'redux-saga/effects';
import { actionTypes } from '../types';
import {
    addTask,
    deleteRequest,
    load,
    toggleTask,
    toggleEditTask,
    updateTask,
    checkAll,
    deleteCompleted
} from './sagas';

export default function* rootSaga() {
    return yield all([
        takeLatest(actionTypes.LOAD_REQUEST, load),
        takeLatest(actionTypes.ADD_TASK, addTask),
        takeLatest(actionTypes.TOGGLE_EDIT_TASK, toggleEditTask),
        takeLatest(actionTypes.UPDATE_TASK, updateTask),
        takeLatest(actionTypes.TOGGLE_TASK, toggleTask),
        takeLatest(actionTypes.REMOVE_TASK, deleteRequest),
        takeLatest(actionTypes.CHECK_ALL, checkAll),
        takeLatest(actionTypes.DELETE_COMPLETED, deleteCompleted)
    ]);
}