import React, { Component, Fragment } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import uuidv4 from "uuid/v4";

class TableGroups extends Component {

    state = {
        list: [],
        groupname: "",
        errors: {}
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.list) {
            this.setState({
                list: nextProps.list
            });
        }
    }
    onSortEnd({ oldIndex, newIndex }) {
        this.setState({
            list: arrayMove(this.state.list, oldIndex, newIndex)
        });
        this.props.updateGroups(this.state.list);
    }

    onChange = e => {
        this.setState({
            groupname: e.target.value
        })
    }

    addGroup = e => {
        e.preventDefault();
        const errors = this.validate(this.state.groupname);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            const newGroup = {
                groupId: uuidv4().split("-")[0],
                name: this.state.groupname,
                tasks: []
            }
            this.props.addGroup(newGroup);
        }
    }

    validate = groupname => {
        let errors = {};
        if (!groupname) errors.groupname = "can't be empty";
        return errors;
    };

    render() {
        const DragHandle = SortableHandle(({ name }) => <div className="card-header">{name}</div>);

        const SortableItem = SortableElement(({ value }) => { return (<div className="col-md-2" key={value._id}><DragHandle name={value.name} /><Container id={value._id} groupId={value.groupId} list={value.tasks} updateTasks={this.props.updateTasks} /></div>) });

        const SortableList = SortableContainer(({ items }) => {
            return (
                <div className="contrainer">
                    <div className="row">
                        {items.map((item, index) => {
                            return <SortableItem key={`item-${index}`} index={index} value={item} ></SortableItem>
                        })}
                    </div>
                </div>
            );
        });

        return (
            <Fragment>
                <div className="jumbotron">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-4">
                                <input
                                    type="text"
                                    id="groupname"
                                    name="groupname"
                                    placeholder="Enter name"
                                    value={this.state.groupname}
                                    onChange={this.onChange}
                                    className={
                                        this.state.errors.groupname ? "form-control is-invalid" : "form-control"
                                    }
                                />
                                <div className="invalid-feedback">{this.state.errors.groupname}</div>
                                <button className="btn btn-primary btn-block" onClick={this.addGroup}>Add new group</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="album py-5 bg-light">
                    <SortableList items={this.state.list} onSortEnd={this.onSortEnd.bind(this)} axis='xy' useDragHandle={true} />
                </div>
            </Fragment>
        )
    }
}

export default DragDropContext(HTML5Backend)(TableGroups);