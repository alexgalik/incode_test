import React, { Component } from 'react';

export default class EditGroupModal extends Component {

    state = {
        name: this.props.name ? this.props.name : '',
        errors: ""
    }
    handlePostNameChange = (e) => {
        this.setState({ name: e.target.value })
    }

    editGroup = (e) => {
        e.preventDefault();
        const { name } = this.state;
        let errors = "";
        if (name === "") errors = "Can't be empty"
        this.setState({ errors: errors });
        if (errors === "") {
            const newPost = {
                "name": name,
                "groupId": this.props.groupId
            }
            this.props.editGroup(newPost)
        }
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
                                            value={this.state.name}
                                            onChange={this.handlePostNameChange}
                                            className={
                                                this.state.errors ? "form-control is-invalid" : "form-control"
                                            }
                                        />
                                    </div>
                                    <div className="invalid-feedback">{this.state.errors}</div>
                                    <br/>
                                    <button className="btn btn-primary " onClick={this.editGroup}>Save</button>
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