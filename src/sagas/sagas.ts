import { call, put, select } from 'redux-saga/effects';
import api from './api';
import {Task, TaskActionTypes, TodoListActionTypes} from '../types';
import { loadFailure, loadSuccess } from '../actions/tasks';
import {completedTasksSelector, getTasksSelector} from '../selectors/index';

export function* load() {
    try {
        const tasks = yield call(api.get, 'http://localhost:3000/tasks');
        yield put(loadSuccess(tasks.data));
    } catch (error) {
        yield put(loadFailure());
    }
}

export function* addTask({ payload }: TodoListActionTypes) {
    try {
        yield call(api.post, 'http://localhost:3000/tasks', payload);
    } catch (error) {
        console.log('POST ERROR');
    }
}

export function* toggleEditTask({ payload }: TaskActionTypes) {
    try {
        yield call(api.patch, `http://localhost:3000/tasks/${payload.id}`, {editing: payload.editing});
    } catch (error) {
        console.log('TOGGLE EDIT ERROR');
    }
}

export function* updateTask({ payload }: TaskActionTypes) {
    try {
        yield call(api.patch, `http://localhost:3000/tasks/${payload.id}`, {text: payload.text});
    } catch (error) {
        console.log('UPDATE ERROR');
    }
}

export function* toggleTask({ payload }: TaskActionTypes) {
    try {
        yield call(api.patch, `http://localhost:3000/tasks/${payload.id}`, {complete: payload.complete});
    } catch (error) {
        console.log('TOGGLE COMPLETE ERROR');
    }
}

export function* deleteRequest({ payload }: TaskActionTypes) {
    try {
        yield call(api.delete, `http://localhost:3000/tasks/${payload.id}`);
    } catch (error) {
        console.log('DELETE ERROR');
    }
}

// костыли, исправить

export function* checkAll() {
    try {
        const tasks = yield select(getTasksSelector);
        yield call(api.patch, `http://localhost:3000/tasks`, tasks)

    } catch (error) {
        console.log('CHECK ALL ERROR');
    }
}

export function* deleteTask(id: number) {
    try {
        yield call(api.delete, `http://localhost:3000/tasks/${id}`);
    } catch (error) {
        console.log('DELETE ERROR');
    }
}

export function* deleteCompleted() {
    const tasks = yield select(completedTasksSelector);
    tasks.forEach((task: Task) => deleteTask(task.id))
}
