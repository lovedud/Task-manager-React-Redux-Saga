import { createSelector } from 'reselect'
import { Task } from "../types";

const getTasks = (state: any) => state.tasks.tasks.data
const sortFilter = (state: any) => state.tasks.sortTasks
const priorityFilter = (state: any) => state.tasks.priorityFilter
const filtering = (state: any) => state.tasks.filtering

export const getTodos = createSelector(
    [ getTasks,  sortFilter, priorityFilter, filtering],
    (tasks: Task[], sortFilter: boolean, priorityFilter: string, filtering: boolean) => {
        let newTasks = tasks;
        newTasks = filtering ? newTasks.filter((task: Task) => task.priority === priorityFilter) : newTasks;
        newTasks = sortFilter ? newTasks.sort((a,b) => a.priority > b.priority ? 1 : -1) : newTasks;
        return newTasks;
    }
)