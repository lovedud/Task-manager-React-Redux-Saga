import { createSelector } from 'reselect'
import { Task } from "../types";

const getTasks = (state: any) => state.tasks.tasks
const sortTasks = (state: any) => state.tasks.sortTasks
const priorityFilter = (state: any) => state.tasks.priorityFilter
const filtering = (state: any) => state.tasks.filtering

export const getTodos = createSelector(
    [ getTasks,  sortTasks, priorityFilter, filtering],
    (tasks: Task[], sortTasks: boolean, priorityFilter: string, filtering: boolean) => {
        let newTasks = tasks;
        newTasks = filtering ? newTasks.filter((task: Task) => task.priority === priorityFilter) : newTasks;
        newTasks = sortTasks ? newTasks.sort((a,b) => a.priority > b.priority ? 1 : -1) : newTasks;
        return newTasks;
    }
)

/*
export const getSortedTodos = createSelector(
    getTodos,
    tasks => tasks.sort((a: Task,b: Task) => a.priority > b.priority)
)*/
