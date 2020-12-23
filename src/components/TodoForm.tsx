import React, { FormEvent, useRef, useEffect } from 'react';
import {Item} from "../types";

interface TodoFormProps {
    emptyList: boolean,
    addItem(data: Item): void,
}

const TodoForm = ({ emptyList, addItem }: TodoFormProps) => {
    const inputText = useRef<HTMLInputElement>(null);

    const focusInputText = () => inputText?.current?.focus();

    useEffect(() => {
        if (emptyList) focusInputText();
    });

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();

        if (inputText && inputText.current && inputText.current.value !== '') {
            addItem({
                id: Math.floor(Math.random() * Math.floor(1000000)),
                text: inputText.current.value,
                editing: false,
                complete: false,
            });
            inputText.current.value = '';
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <input ref={inputText} placeholder="What needs to be done?"  />
            <button type="submit">
                <i className="fas fa-plus" />
            </button>
        </form>
    );
};

export default TodoForm;