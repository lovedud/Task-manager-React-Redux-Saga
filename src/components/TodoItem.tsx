import React, { useRef, useEffect } from 'react';
import { Item } from '../types';

interface TodoItemProps {
    item: Item,
    toggleItem(id: number, complete: boolean): void,
    toggleEditItem(id: number, editing: boolean): void,
    updateItem(id: number, text: string): void,
    removeItem(id: number): void
}

const TodoItem = ({
                    item: {
                        id, text, editing, complete,
                    },
                    toggleItem,
                    toggleEditItem,
                    updateItem,
                    removeItem,
                }: TodoItemProps) => {
    const inputText = useRef<HTMLInputElement>(null);

    useEffect(() => inputText?.current?.focus());

    const acceptEdit = (itemID: number) => {
        const itemText = inputText?.current?.value?.trim() || '';

        if (itemText !== '') {
            updateItem(itemID, itemText);
            toggleEditItem(itemID, !editing);
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
                            <span className="icon" role="presentation" onClick={() => toggleEditItem(id, !editing)}>
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
                                    toggleItem(id, !complete)
                                }}
                                role="presentation"
                                className={complete ? 'checkbox-item checked' : 'checkbox-item'}
                            />
                            <span>{complete ? <s>{text}</s> : text}</span>
                        </div>
                        <div>
              <span className="icon" role="presentation" onClick={() => toggleEditItem(id, !editing)}>
                <i className="fas fa-pencil-alt" />
              </span>
                            <span className="icon" role="presentation" onClick={() => removeItem(id)}>
                <i className="fas fa-trash-alt" />
              </span>
                        </div>
                    </>
                )}
        </li>
    );
};

export default TodoItem;