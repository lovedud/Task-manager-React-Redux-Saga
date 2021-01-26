import React from 'react';
import {actionTypes} from '../types';
import EmptyMessage from './EmptyMessage';
import TodoFilters from './TodoFilters';

interface MessageProps {
    filterState: string,
    getTaskCounter(): {
        counter: number,
        text: string
    }
}

const Message = ({ filterState, getTaskCounter }: MessageProps) => (
    filterState === actionTypes.SHOW_COMPLETED
        ? (
            <>
                <EmptyMessage message="There are no tasks completed yet!" />
                <TodoFilters taskCounter={getTaskCounter()}  />
            </>
        ) : <EmptyMessage message="Add your first To Do!" />
);

export default Message;