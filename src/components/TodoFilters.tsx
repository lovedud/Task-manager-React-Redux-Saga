import React from 'react';
import { Link } from "react-router-dom";
import FilterLink from '../containers/FilterLink';
import { VisibilityFilters } from '../types';

interface CounterProps {
    taskCounter: {
        counter: number,
        text: string
    },
}

export default ({ taskCounter: { counter, text } }: CounterProps) => (
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
                <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
            </Link>
            <Link to="/active">
                <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
            </Link>
            <Link to="/done">
                <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
            </Link>
        </div>
    </div>
);