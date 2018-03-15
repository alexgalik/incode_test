import React, { Component } from 'react';

export default class EditTaskModal extends Component {

    state = {
        title: this.props.title ? this.props.title : '',
        errors: ""
    }
    handlePostNameChange = (e) => {
        this.setState({ title: e.target.value })
    }

    editTask = (e) => {
        e.preventDefault();
        const { title } = this.state;
        let errors = "";
        if (title === "") errors = "Can't be empty"
        this.setState({ errors: errors });
        if (errors === "") {
            const newPost = {
                "title": title,
                "taskId": this.props.taskId,
                "groupId": this.props.groupId
            }
            this.props.editTask(newPost)
        }
    }

    deleteTask = () => {
        this.props.deleteTask(this.props.groupId, this.props.taskId)
    }

    render() {
        return (
            <div className="edit_group">
                <div className="container" style={{ height: "100vh" }}>
                    <div className="row align-items-center" style={{ height: "100vh" }}>
                        <div className="col col-xs-12 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3">
                            <div className="card">
                                <div className="card-header text-dark">{this.props.children}</div>
                                <div className="card-body">
                                    <div className="">
                                        <input
                                            autoComplete= "off"
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={this.state.title}
                                            onChange={this.handlePostNameChange}
                                            className={
                                                this.state.errors ? "form-control is-invalid" : "form-control"
                                            }
                                        />
                                    </div>
                                    <div className="invalid-feedback">{this.state.errors}</div>
                                    <br/>
                                    <button className="btn btn-primary " onClick={this.editTask}>Save</button>
                                    <button className="btn btn-danger " onClick={this.deleteTask}>Delete</button>
                                    <span className="btn btn-primary" onClick={this.props.onClose}>Close</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}