import React, { Component } from 'react';

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            city: '',
            state: 'GA',
            todo_priority: '',
            todo_completed: false
        }
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    }

    onChangeState(e) {
        this.setState({
            state: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`City: ${this.state.city}`);
        console.log(`State: ${this.state.state}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);

        this.setState({
            todo_description: '',
            city: '',
            state: 'GA',
            todo_priority: '',
            todo_completed: false
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Upload your Image</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>City: </label>
                        <input
                                type="text"
                                className="form-control"
                                value={this.state.city}
                                onChange={this.onChangeCity}
                                />
                    </div>
                    <div className="form-group">
                        <label>State: </label>
                        <select value={this.state.value} onChange={this.onChangeState}>
                        <option value="GA">GA</option>
                        <option value="CA">CA</option>
                        <option value="NV">NV</option>
                        <option value="NY">NY</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityLow"
                                    value="Food"
                                    checked={this.state.todo_priority==='Low'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Food</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="Drink"
                                    checked={this.state.todo_priority==='Medium'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Drink</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityHigh"
                                    value="Inside"
                                    checked={this.state.todo_priority==='High'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Inside</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityHigh"
                                    value="Outside"
                                    checked={this.state.todo_priority==='High'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Outside</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Upload" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
