import React from "react";

interface DropdownProps {
    priority: string,
}

class Dropdown extends React.Component<{}, DropdownProps> {
    constructor(props: any) {
        super(props);
        this.state = { priority: "Medium" };
    }

    handleChange = (event: any)=> {
        this.setState({ priority: event.target.value });
    };

    render() {
        return (
                <label>
                    <div>Priority:</div>
                    <select value={this.state.priority} onChange={this.handleChange}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </label>
        );
    }
}

export default Dropdown