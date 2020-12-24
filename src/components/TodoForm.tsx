import React, { FormEvent, useRef, useEffect } from 'react';
import {Task} from "../types";

interface TodoFormProps {
    emptyList: boolean,
    addTask(data: Task): void,
}

const TodoForm = ({ emptyList, addTask }: TodoFormProps) => {
    const inputText = useRef<HTMLInputElement>(null);

    const focusInputText = () => inputText?.current?.focus();

    useEffect(() => {
        if (emptyList) focusInputText();
    });

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();

        if (inputText && inputText.current && inputText.current.value !== '') {
            addTask({
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