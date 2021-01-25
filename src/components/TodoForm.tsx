import React, {FormEvent, useRef, useEffect, useState} from 'react';
import Dropdown from "./Dropdown";

interface TodoFormProps {
    emptyList: boolean,
    addTask(data: { text: string, editing: boolean, complete: boolean, priority: string }): void,
}

const TodoForm = ({ emptyList, addTask }: TodoFormProps) => {
    const inputText = useRef<HTMLInputElement>(null);
    const [priority, setPriority] = useState('Important');

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();

        if (inputText && inputText.current && inputText.current.value !== '')
        {
            addTask({text: inputText.current.value, editing: false, complete: false, priority: priority});
            inputText.current.value = '';
            console.log({text: inputText.current.value, editing: false, complete: false, priority: priority})
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <input autoFocus={true} placeholder="What needs to be done?"  />

            <Dropdown priority={priority} setPriority={setPriority} />

            <button className="add-btn" type="submit">
                <i className="fas fa-plus" />
            </button>
        </form>
    );
};

export default TodoForm;