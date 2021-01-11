import React, { FormEvent, useRef, useEffect } from 'react';
import Dropdown from "./Dropdown";

interface TodoFormProps {
    emptyList: boolean,
    addTask(data: { text: string, editing: boolean, complete: boolean, priority: string }): void,
}

const TodoForm = ({ emptyList, addTask }: TodoFormProps) => {
    const inputText = useRef<HTMLInputElement>(null);
    const selectText = useRef<HTMLSelectElement>(null);

    const focusInputText = () => inputText?.current?.focus();

    useEffect(() => {
        if (emptyList) focusInputText();
    });

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();

        if (
            inputText && inputText.current && inputText.current.value !== '' &&
            selectText && selectText.current && selectText.current.value !== ''
        ) {
            addTask({text: inputText.current.value, editing: false, complete: false, priority: selectText.current.value});
            inputText.current.value = '';
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <input ref={inputText} placeholder="What needs to be done?"  />

            <Dropdown />

            <button className="add-btn" type="submit">
                <i className="fas fa-plus" />
            </button>
        </form>
    );
};

export default TodoForm;