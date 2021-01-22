import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Header from '../components/Header';
import TodoFilters from '../components/TodoFilters';
import TodoForm from '../components/TodoForm';
import TodoTask from '../components/TodoItem';
import {ApplicationState, Task, TasksTypes, VisibilityFilters} from '../types';
import TodoMessage from '../components/TodoMessage';
import {addTask, loadRequest, removeTask, sortTasks, toggleEditTask, toggleTask, updateTask} from "../actions/tasks";
import { getTodos } from "../selectors";

interface StateProps {
    tasks: Task[],
    filterState: string,
    filter: string,
    sortState: boolean,
    filtering: boolean,
    priorityFilter: string,
}

interface DispatchProps {
    addTask(data: { text: string, editing: boolean, complete: boolean, priority: string }): void,
    toggleTask(id: number, complete: boolean): void,
    toggleEditTask(id: number, editing: boolean): void,
    updateTask(id: number, text: string): void,
    removeTask(id: number): void,
    loadRequest(): void,
    onSortTasks(prop: boolean): void,
    setFiltering(filtering: boolean): void,
    updatePriority(prior: string): void,
}

type Props = StateProps & DispatchProps;

const TodoList = ({
                      tasks,
                      filter,
                      addTask,
                      toggleTask,
                      toggleEditTask,
                      updateTask,
                      removeTask,
                      filterState,
                      loadRequest,
                      onSortTasks,
                      setFiltering,
                      updatePriority,
                  }: Props) => {

    const [checked, setChecked] = useState(true);

    useEffect(() => {
        loadRequest();
    }, [loadRequest]);

    const isAllChecked = () => {
        return tasks.every((task) => (task.complete))
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
        onSortTasks(true)
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
                        <span>
                            <button onClick={() => {
                                setFiltering(false)
                            }}>
                            All
                        </button>
                        <button className="high_priority" onClick={() => {
                            updatePriority('High')
                            setFiltering(true)
                        }}>
                            High
                        </button>
                        <button className="imp_priority" onClick={() => {
                            updatePriority('Important')
                            setFiltering(true)
                        }}>
                            Important
                        </button>
                        <button className="low_priority" onClick={() => {
                            updatePriority('Low')
                            setFiltering(true)
                        }}>
                            Low
                        </button>
                        </span>

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

const mapStateToProps = (state: any) => ({
    tasks: getTodos(state),
    filterState: state.filterState,
    sortState: state.sortTasks,
    priorityFilter: state.priorityFilter,
    filtering: state.filtering
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loadRequest: () => dispatch(loadRequest()),
        addTask: (data: { text: string, editing: boolean, complete: boolean, priority: string }) => dispatch(addTask(data)),
        toggleTask: (id: number, complete: boolean) => dispatch(toggleTask(id, complete)),
        toggleEditTask: (id: number, editing: boolean) => dispatch(toggleEditTask(id, editing)),
        updateTask: (id: number, text: string) => dispatch(updateTask(id, text)),
        removeTask: (id: number) => dispatch(removeTask(id)),
        onSortTasks: (prop: boolean) => dispatch(sortTasks(prop)),
        setFiltering: (filtering: boolean) => dispatch({type: 'SET_FILTERING', payload: filtering}),
        updatePriority: (prior: string) => dispatch({type: 'UPDATE__PRIORITY_FILTER', payload: prior}),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoList);