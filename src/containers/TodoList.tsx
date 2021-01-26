import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Header from '../components/Header';
import TodoFilters from '../components/TodoFilters';
import TodoForm from '../components/TodoForm';
import TodoTask from '../components/TodoItem';
import { actionTypes, Task } from '../types';
import TodoMessage from '../components/TodoMessage';
import {
    addTask,
    checkAll, deleteCompleted,
    loadRequest,
    removeTask,
    setFiltering,
    sortTasks,
    toggleEditTask,
    toggleTask,
    updatePriority,
    updateTask
} from "../actions/tasks";
import {
    filterStateSelector,
    getSorterFilteredTasksSelector,
    isAllCheckedSelector,
    priorityFilterSelector,
    setFilteringSelector,
    sortTasksSelector
} from "../selectors";

interface StateProps {
    tasks: Task[],
    filterState: string,
    filter: string,
    sortState: boolean,
    filtering: boolean,
    priorityFilter: string,
    isAllChecked: boolean
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
    checkAll(isAllChecked: boolean): void,
    deleteCompleted(): void,
}

type Props = StateProps & DispatchProps;

const TodoList = ({
                      tasks,
                      filter,
                      isAllChecked,
                      sortState,
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
                      checkAll,
                      deleteCompleted,
                  }: Props) => {


    useEffect(() => {
        loadRequest();
    }, [loadRequest]);

    const getTaskCounter = () => (filterState === actionTypes.SHOW_COMPLETED
        ? {
            counter: tasks.filter((task: Task) => task.complete).length,
            text: 'completed tasks',
        } : {
            counter: tasks.filter((task: Task) => !task.complete).length,
            text: 'tasks left',
        });

    const sortingTasks = () => {
        onSortTasks(!sortState)
    }

    const checkAllTasks = () => (
        checkAll(!isAllChecked)
    )

    return (
        <div className="todo-list">
            <Header title="Todos" />

            <div className="content">
                <div>
                    <TodoForm
                        emptyList={!tasks.length}
                        addTask={addTask}
                    />
                    <button className={isAllChecked ? 'check-all checked' : 'check-all'} onClick={checkAllTasks}>
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
    tasks: getSorterFilteredTasksSelector(state),
    isAllChecked: isAllCheckedSelector(state),
    sortState: sortTasksSelector(state),
    filterState: filterStateSelector(state),
    priorityFilter: priorityFilterSelector(state),
    filtering: setFilteringSelector(state),
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
        setFiltering: (filtering: boolean) => dispatch(setFiltering(filtering)),
        updatePriority: (prior: string) => dispatch(updatePriority(prior)),
        checkAll: (isAllChecked: boolean) => dispatch(checkAll(isAllChecked)),
        deleteCompleted: () => dispatch(deleteCompleted())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoList);