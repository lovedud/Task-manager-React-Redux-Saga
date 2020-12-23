import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Header from '../components/Header';
import TodoFilters from '../components/TodoFilters';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import * as itemsActions from '../actions/tasks';
import { ApplicationState, Item, VisibilityFilters } from '../types';
import TodoMessage from '../components/TodoMessage';

interface StateProps {
    tasks: Item[],
    filterState: string
    filter: string
}

interface DispatchProps {
    addTask(data: Item): void,
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
        return tasks.every(task => (task.complete))
    }

    const [checked, setChecked] = useState(true)

    useEffect(() => {
        loadRequest();
    }, [loadRequest]);


    const getTaskCounter = () => (filterState === VisibilityFilters.SHOW_COMPLETED
        ? {
            counter: tasks.filter((task: Item) => task.complete).length,
            text: 'completed tasks',
        } : {
            counter: tasks.filter((task: Item) => !task.complete).length,
            text: 'tasks left',
        });

    const checkAll = () => {
        if (checked) {
            tasks.forEach((task) => {
                toggleTask(task.id, false)
            })
        } else {
            tasks.forEach((task) => {
                toggleTask(task.id, true)
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
                        addItem={addTask}
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
                                {filterItems(tasks, filter).map((task: Item) => (
                                    <TodoItem
                                        key={task.id}
                                        item={task}
                                        toggleItem={toggleTask}
                                        toggleEditItem={toggleEditTask}
                                        updateItem={updateTask}
                                        removeItem={removeTask}
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

const filterItems = (items: Item[], filter: string) => {
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

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(itemsActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoList);