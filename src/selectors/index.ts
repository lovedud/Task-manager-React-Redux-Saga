import { createSelector } from 'reselect'
import {ApplicationState, Task} from "../types";

const getTasks = (state: ApplicationState) => state.tasks.data

export const getTodos = createSelector(
    [ getTasks ],
    (tasks: Task[]) => {
                return tasks
    }
)


