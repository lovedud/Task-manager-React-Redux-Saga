import { combineReducers } from 'redux';
import tasks from './tasks';
import filterState from './filter';
import sortTasks from "./sortTasks";
import priorityFilter from "./priorityFilter";
import filtering from "./setFiltering";

export default combineReducers({
    tasks,
    filterState,
    sortTasks,
    priorityFilter,
    filtering,
});