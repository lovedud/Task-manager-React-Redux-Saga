import { all, takeLatest } from 'redux-saga/effects';
import { ItemsTypes } from '../types';
import {
    addTask,
    deleteRequest,
    load,
    toggleItem,
    toggleEditTask,
    updateTask
} from './sagas';

export default function* rootSaga() {
    return yield all([
        takeLatest(ItemsTypes.LOAD_REQUEST, load),
        takeLatest(ItemsTypes.ADD_TASK, addTask),
        takeLatest(ItemsTypes.TOGGLE_EDIT_TASK, toggleEditTask),
        takeLatest(ItemsTypes.UPDATE_TASK, updateTask),
        takeLatest(ItemsTypes.TOGGLE_TASK, toggleItem),
        takeLatest(ItemsTypes.REMOVE_TASK, deleteRequest),
    ]);
}