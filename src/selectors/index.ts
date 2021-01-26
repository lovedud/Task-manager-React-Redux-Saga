import { createSelector } from 'reselect'
import {Task} from "../types";

export const getTasksSelector = (state: any) => state.tasks.tasks
export const sortTasksSelector = (state: any) => state.tasks.sortTasks
export const setFilteringSelector = (state: any) => state.tasks.filtering
export const priorityFilterSelector = (state: any) => state.tasks.priorityFilter
export const filterStateSelector = (state: any) => state.tasks.filterState

export const getSorterFilteredTasksSelector = createSelector(
    [ getTasksSelector,  sortTasksSelector, priorityFilterSelector, setFilteringSelector],
    (tasks: Task[], sortTasks: boolean, priorityFilter: string, filtering: boolean) => {
        let newTasks = tasks;
        newTasks = filtering ? newTasks.filter((task: Task) => task.priority === priorityFilter) : newTasks;
        newTasks = sortTasks ? newTasks.sort((a,b) => a.priority > b.priority ? 1 : -1) : newTasks;
        return newTasks;
    }
)

export const isAllCheckedSelector = createSelector(
    getTasksSelector,
    tasks => tasks.every((task: Task) => (task.complete))
)

export const completedTasksSelector = createSelector(
    getTasksSelector,
    tasks => tasks.filter((task: Task) => task.complete)
)


