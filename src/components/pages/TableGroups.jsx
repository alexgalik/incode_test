import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import uuidv4 from "uuid/v4";
import EditGroupModal from "../modals/editGroup";

class TableGroups extends Component {

    state = {
        list: [],
        groupname: "",
        errors: {},
        editingGroup: {
            name: "",
            groupId: ""
        },
        isGroupEgiting: false,
        isTaskEditing: false
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
        let groups = []
        this.state.list.map((item, index) => {
            return groups.push({ groupId: item.groupId, groupIndex: index });
        })
        this.props.updateGroups(groups);
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
            const length = this.state.list.length;
            let groupIndex = length;
            if (length<=this.state.list[length-1].groupIndex){
                groupIndex = Number(this.state.list[length-1].groupIndex) + 1;
            } 
            console.log(groupIndex)
            const newGroup = {
                groupId: uuidv4().split("-")[0],
                groupIndex: groupIndex.toString(),
                name: this.state.groupname,
                tasks: []
            }
            this.setState({
                groupname: ""
            })
            this.props.addGroup(newGroup);
        }
    }

    validate = groupname => {
        let errors = {};
        if (!groupname) errors.groupname = "can't be empty";
        return errors;
    };

    ToggleGroupModal = () => {
        this.setState(state => ({ isGroupEgiting: !state.isGroupEgiting }));
    }

    editGroup = (updatedGroup) => {
        this.ToggleGroupModal();
        this.props.editGroup(updatedGroup)
    }

    setEditGropName = (name, groupId) => {
        this.ToggleGroupModal()
        this.setState({
            editingGroup: {
                name: name,
                groupId: groupId
            }
        })
    }

    deleteGroup = (groupId) => {
        this.props.deleteGroup(groupId);
    }

    render() {
        const DragHandle = SortableHandle(({ name }) => <div className="card-header">{name}</div>
        );

        const SortableItem = SortableElement(({ value }) => {
            return (
                <div className="col-md-2" key={value._id}>
                    <div className="container groupheader">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <DragHandle name={value.name} />
                            </div>
                            <i className="material-icons" onClick={() => { this.setEditGropName(value.name, value.groupId) }}>border_color</i>
                            <i className="material-icons" onClick={() => { this.deleteGroup(value.groupId) }}>
                                delete_forever
                            </i>
                        </div>
                    </div>

                    <Container id={value._id} groupId={value.groupId} list={value.tasks} updateTasks={this.props.updateTasks} />
                </div>

            )
        });

        const SortableList = SortableContainer(({ items }) => {
            return (
                <div className="contrainer">
                    <div className="row">
                        {items.map((item, index) => {
                            return (<SortableItem key={`item-${index}`} index={index} value={item} >{item.name}</SortableItem>)
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
                {this.state.isGroupEgiting &&
                    ReactDOM.createPortal(
                        <EditGroupModal
                            onClose={this.ToggleGroupModal.bind(this)}
                            editGroup={this.editGroup.bind(this)}
                            name={this.state.editingGroup.name}
                            groupId={this.state.editingGroup.groupId}
                        >
                            <h1>Edit this post</h1>
                        </EditGroupModal>,
                        document.getElementById('edit_group')
                    )
                }
            </Fragment>
        )
    }
}

export default DragDropContext(HTML5Backend)(TableGroups);

