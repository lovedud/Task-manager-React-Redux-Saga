import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Header from '../components/Header';
import TodoFilters from '../components/TodoFilters';
import TodoForm from '../components/TodoForm';
import TodoTask from '../components/TodoItem';
import * as TasksActions from '../actions/tasks';
import { ApplicationState, Task, VisibilityFilters } from '../types';
import TodoMessage from '../components/TodoMessage';
import {addTask, loadRequest, removeTask, toggleEditTask, toggleTask, updateTask} from "../actions/tasks";

interface StateProps {
    tasks: Task[],
    filterState: string
    filter: string
}

interface DispatchProps {
    addTask(data: { text: string, editing: boolean, complete: boolean }): void,
    toggleTask(id: number, complete: boolean): void,
    toggleEditTask(id: number, editing: boolean): void,
    updateTask(id: number, text: string): void,
    removeTask(id: number): void,
    loadRequest(): void
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
                  }: Props) => {

    const isAllChecked = () => {
        console.log(checked)
        return tasks.every(task => (task.complete))
    }

    const [checked, setChecked] = useState(true)

    useEffect(() => {
        loadRequest();
    }, [loadRequest]);


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
                </div>


                {   filterItems(tasks, filter).length === 0
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

                            <TodoFilters taskCounter={getTaskCounter()}/>
                        </>
                    )}
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
    tasks: filterItems(state.tasks.data, (state.filterState)),
    filterState: state.filterState,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addTask: (data: { text: string, editing: boolean, complete: boolean }) => dispatch(addTask(data)),
        toggleTask: (id: number, complete: boolean) => dispatch(toggleTask(id, complete)),
        toggleEditTask: (id: number, editing: boolean) => dispatch(toggleEditTask(id, editing)),
        updateTask: (id: number, text: string) => dispatch(updateTask(id, text)),
        removeTask: (id: number) => dispatch(removeTask(id)),
        loadRequest: () => dispatch(loadRequest()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoList);