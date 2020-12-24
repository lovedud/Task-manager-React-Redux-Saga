import React, { FormEvent, useRef, useEffect } from 'react';
import {Task} from "../types";

interface TodoFormProps {
    emptyList: boolean,
    addTask(data: { text: string, editing: boolean, complete: boolean }): void,
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
            addTask({text: inputText.current.value, editing: false, complete: false});
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