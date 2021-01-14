import { combineReducers } from 'redux';
import tasks from './tasks';
import filterState from './filter';
import sortTasks from "./sortTasks";

export default combineReducers({
    tasks,
    filterState,
    sortTasks,
});