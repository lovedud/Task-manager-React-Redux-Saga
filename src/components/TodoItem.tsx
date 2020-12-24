import React, { useRef, useEffect } from 'react';
import { Task } from '../types';

interface TodoTaskProps {
    item: Task,
    toggleTask(id: number, complete: boolean): void,
    toggleEditTask(id: number, editing: boolean): void,
    updateTask(id: number, text: string): void,
    removeTask(id: number): void
}

const TodoTask = ({
                    item: {
                        id, text, editing, complete,
                    },
                    toggleTask,
                    toggleEditTask,
                    updateTask,
                    removeTask,
                }: TodoTaskProps) => {
    const inputText = useRef<HTMLInputElement>(null);

    useEffect(() => inputText?.current?.focus());

    const acceptEdit = (itemID: number) => {
        const itemText = inputText?.current?.value?.trim() || '';

        if (itemText !== '') {
            updateTask(itemID, itemText);
            toggleEditTask(itemID, !editing);
        }
    };

    return (
        <li>
            {editing
                ? (
                    <>
                        <form onSubmit={() => acceptEdit(id)}>
                            <input
                                className="edit-item"
                                ref={inputText}
                                defaultValue={text}
                            />
                        </form>

                        <div>
                            <span className="icon" role="presentation" onClick={() => acceptEdit(id)}>
                                <i className="fas fa-save" />
                            </span>
                            <span className="icon" role="presentation" onClick={() => toggleEditTask(id, !editing)}>
                                <i className="fas fa-ban" />
                            </span>
                        </div>
                    </>
                )
                : (
                    <>
                        <div className="check-item-container">
                            <div
                                onClick={
                                    () => {
                                        toggleTask(id, !complete)
                                }}
                                role="presentation"
                                className={complete ? 'checkbox-item checked' : 'checkbox-item'}
                            />
                            <span>{complete ? <s>{text}</s> : text}</span>
                        </div>
                        <div>
              <span className="icon" role="presentation" onClick={() => toggleEditTask(id, !editing)}>
                <i className="fas fa-pencil-alt" />
              </span>
                            <span className="icon" role="presentation" onClick={() => removeTask(id)}>
                <i className="fas fa-trash-alt" />
              </span>
                        </div>
                    </>
                )}
        </li>
    );
};

export default TodoTask;