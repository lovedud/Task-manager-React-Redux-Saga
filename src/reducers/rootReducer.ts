import { combineReducers } from 'redux';
import tasks from './tasks';
import filterState from './filter';

export default combineReducers({
    tasks,
    filterState,
});