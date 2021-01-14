import React from "react";

interface DropdownProps {
    priority: string,
    setPriority(priority: string): void,
}

const Dropdown = ({ priority, setPriority }: DropdownProps) => {

    const handleChange = (event: any)=> {
        setPriority(event.target.value);
    };

    return (
        <label>
            <select value={priority} onChange={handleChange}>
                <option className="high_priority" value="High">High</option>
                <option className="imp_priority" value="Important">Important</option>
                <option className="low_priority" value="Low">Low</option>
            </select>
        </label>
    );
}

export default Dropdown