import React from 'react';
import { Link } from "react-router-dom";
import FilterLink from '../containers/FilterLink';
import { actionTypes } from '../types';

interface CounterProps {
    taskCounter: {
        counter: number,
        text: string
    },
}

const Counter = ({ taskCounter: { counter, text } }: CounterProps) => (
    <div className="filters-container">
        <div>
      <span className="active">
        {counter}
      </span>
            {' '}
            <span>{text}</span>
        </div>
        <div className="filters">
            <Link to="/">
                <FilterLink filter={actionTypes.SHOW_ALL}>All</FilterLink>
            </Link>
            <Link to="/active">
                <FilterLink filter={actionTypes.SHOW_ACTIVE}>Active</FilterLink>
            </Link>
            <Link to="/done">
                <FilterLink filter={actionTypes.SHOW_COMPLETED}>Completed</FilterLink>
            </Link>
        </div>
    </div>
);

export default Counter;