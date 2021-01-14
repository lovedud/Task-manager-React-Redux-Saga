import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Header from '../components/Header';
import TodoFilters from '../components/TodoFilters';
import TodoForm from '../components/TodoForm';
import TodoTask from '../components/TodoItem';
import {ApplicationState, Task, VisibilityFilters} from '../types';
import TodoMessage from '../components/TodoMessage';
import {addTask, loadRequest, removeTask, toggleEditTask, toggleTask, updateTask} from "../actions/tasks";
import {getTodos} from "../selectors";

interface StateProps {
    tasks: Task[],
    filterState: string,
    filter: string,
    sortState: boolean
}

interface DispatchProps {
    addTask(data: { text: string, editing: boolean, complete: boolean, priority: string }): void,
    toggleTask(id: number, complete: boolean): void,
    toggleEditTask(id: number, editing: boolean): void,
    updateTask(id: number, text: string): void,
    removeTask(id: number): void,
    loadRequest(): void,
    onSortTasks(prop: boolean): void,
}

type Props = StateProps & DispatchProps;

const TodoList = ({
                      tasks,
                      filter,
                      sortState,
                      addTask,
                      toggleTask,
                      toggleEditTask,
                      updateTask,
                      removeTask,
                      filterState,
                      loadRequest,
                      onSortTasks,
                  }: Props) => {

    const [checked, setChecked] = useState(true);
    const [sorted, setSorted] = useState(false)

    useEffect(() => {
        loadRequest();
    }, [loadRequest]);

    const isAllChecked = () => {
        return tasks.every(task => (task.complete))
    }

    const getTaskCounter = () => (filterState === VisibilityFilters.SHOW_COMPLETED
        ? {
            counter: tasks.filter((task: Task) => task.complete).length,
            text: 'completed tasks',
        } : {
            counter: tasks.filter((task: Task) => !task.complete).length,
            text: 'tasks left',
        });

    const checkAll = () => {
        setChecked(isAllChecked())
        if (checked) {
            tasks.forEach((task) => {
                toggleTask(task.id, true)
            })
        } else if (!checked) {
            tasks.forEach((task) => {
                toggleTask(task.id, false)
            })
        }
    }

    const deleteCompleted = () => {
        tasks.forEach((task) => {
            if (task.complete) {
                removeTask(task.id)
            }
        })
    }

    const sortingTasks = () => {
        setSorted(!sorted);
        onSortTasks(sorted)
    }

    return (
        <div className="todo-list">
            <Header title="Todos" />

            <div className="content">
                <div>
                    <TodoForm
                        emptyList={!tasks.length}
                        addTask={addTask}
                    />
                    <button className={isAllChecked() ? 'check-all checked' : 'check-all'} onClick={checkAll}>
                        <i className="fas fa-check-circle"></i>
                    </button>
                    <button className="check-all" onClick={deleteCompleted}>
                        <i className="fas fa-trash-alt"></i>
                    </button>

                    <span>
                        Priority
                        <button onClick={sortingTasks}>
                            <i className="fa fa-sort" aria-hidden="true"></i>
                        </button>
                    </span>

                    <span>

                    </span>
                </div>

                {    filterItems(tasks, filter).length === 0
                    ? (
                        <TodoMessage
                            filterState={filterState}
                            getTaskCounter={getTaskCounter}
                        />
                    ) : (

                        <>
                            <ul className="items">
                                {filterItems(tasks, filter).map((task: Task) => (
                                    <TodoTask
                                        key={task.id}
                                        item={task}
                                        toggleTask={toggleTask}
                                        toggleEditTask={toggleEditTask}
                                        updateTask={updateTask}
                                        removeTask={removeTask}
                                    />
                                ))}
                            </ul>

                        </>
                    )}
                <TodoFilters taskCounter={getTaskCounter()}/>
            </div>
        </div>
    );
};

const filterItems = (items: Task[], filter: string) => {
    switch (filter) {
        case "SHOW_ACTIVE":
            return items.filter((item) => !item.complete);
        case "SHOW_COMPLETED":
            return items.filter((item) => item.complete);
        default:
            return items;
    }
};

const mapStateToProps = (state: ApplicationState) => ({
    tasks: getTodos(state),
    filterState: state.filterState,
    sortState: state.sortTasks
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addTask: (data: { text: string, editing: boolean, complete: boolean, priority: string }) => dispatch(addTask(data)),
        toggleTask: (id: number, complete: boolean) => dispatch(toggleTask(id, complete)),
        toggleEditTask: (id: number, editing: boolean) => dispatch(toggleEditTask(id, editing)),
        updateTask: (id: number, text: string) => dispatch(updateTask(id, text)),
        removeTask: (id: number) => dispatch(removeTask(id)),
        loadRequest: () => dispatch(loadRequest()),
        onSortTasks: (prop: boolean) => {dispatch({ type: 'SORT_TASKS', payload: prop })}
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoList);