import { createSelector } from 'reselect'
import {ApplicationState, Task} from "../types";

const getTasks = (state: ApplicationState) => state.tasks.data
const sortFilter = (state: ApplicationState) => state.sortTasks
const priorityFilter = (state: ApplicationState) => state.priorityFilter
const filtering = (state: ApplicationState) => state.filtering

export const getTodos = createSelector(
    [ getTasks,  sortFilter, priorityFilter, filtering],
    (tasks: Task[], sortFilter: boolean, priorityFilter: string, filtering: boolean) => {
        let newTasks = tasks;
        newTasks = filtering ? newTasks.filter((task: Task) => task.priority === priorityFilter) : newTasks;
        newTasks = sortFilter ? newTasks.sort((a,b) => a.priority > b.priority ? 1 : -1) : newTasks;
        return newTasks;
    }
)


