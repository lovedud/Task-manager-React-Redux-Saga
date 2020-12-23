import { call, put } from 'redux-saga/effects';
import api from './api';
import { TodoListActionTypes } from '../types';
import { loadFailure, loadSuccess } from '../actions/tasks';

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

export function* toggleEditTask({ payload }: TodoListActionTypes) {
    try {
        yield call(api.patch, `http://localhost:3000/tasks/${payload.id}`, {editing: payload.editing});
    } catch (error) {
        console.log('TOGGLE EDIT ERROR');
    }
}

export function* updateTask({ payload }: TodoListActionTypes) {
    try {
        yield call(api.patch, `http://localhost:3000/tasks/${payload.id}`, {text: payload.text});
    } catch (error) {
        console.log('UPDATE ERROR');
    }
}

export function* toggleItem({ payload }: TodoListActionTypes) {
    try {
        yield call(api.patch, `http://localhost:3000/tasks/${payload.id}`, {complete: payload.complete});
    } catch (error) {
        console.log('TOGGLE COMPLETE ERROR');
    }
}

export function* deleteRequest({ payload }: TodoListActionTypes) {
    try {
        yield call(api.delete, `http://localhost:3000/tasks/${payload.id}`);
    } catch (error) {
        console.log('DELETE ERROR');
    }
}

export function* checkAll() {
    try {
        yield call(api.get, `http://localhost:3000/checkAll/`);
    } catch (error) {
        console.log('CHECK ALL ERROR');
    }
}
