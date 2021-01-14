import { createSelector } from 'reselect'
import {ApplicationState, Task} from "../types";

const getTasks = (state: ApplicationState) => state.tasks.data
const sortFilter = (state: ApplicationState) => state.sortTasks

export const getTodos = createSelector(
    [ getTasks,  sortFilter],
    (tasks: Task[], sortFilter: boolean) => {
                return sortFilter ? tasks.sort((a,b) => a.priority > b.priority ? 1 : -1) : tasks
    }
)

export const sortedTasks = createSelector(
    [ getTasks ],
    (tasks: Task[]) => {
        return tasks.sort((a,b) => a.priority > b.priority ? 1 : -1)
    }
)


