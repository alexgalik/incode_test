import React, { Component } from 'react';
import update from 'react-addons-update';
import { DropTarget } from 'react-dnd';
import Card from './Card';
import uuidv4 from "uuid/v4";

class Container extends Component {
    state = {
        id: this.props.id,
        groupId: this.props.groupId,
        cards: this.props.list,
        taskname: "",
        taskAdding: false,
        errors: {}
    }
    pushCard(card) {
        this.setState(update(this.state, {
            cards: {
                $push: [card]
            }
        }));
        this.props.updateTasks(this.state.groupId, this.state.cards)
    }
    removeCard(index) {
        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [index, 1]
                ]
            }
        }));
        this.props.updateTasks(this.state.groupId, this.state.cards)
    }
    moveCard(dragIndex, hoverIndex) {
        const { cards } = this.state;
        const dragCard = cards[dragIndex];

        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard]
                ]
            }
        }));
        this.props.updateTasks(this.state.groupId, this.state.cards)
    }

    toggleAdding = () => {
        this.setState(state => ({ taskAdding: !state.taskAdding }));
    }

    onChange = e => {
        this.setState({
            taskname: e.target.value
        })
    }

    addTask = e => {
        e.preventDefault();
        const errors = this.validate(this.state.taskname);
        this.setState({ errors });
        let newTasks = [];
        if (Object.keys(errors).length === 0) {
            let newTask = {
                taskId: uuidv4().split("-")[0],
                title: this.state.taskname
            }
            newTasks = [...this.state.cards, newTask]
        }
        this.props.addNewTask(this.state.groupId, newTasks);
        this.toggleAdding();
    }

    validate = taskname => {
        let errors = {};
        if (!taskname) errors.taskname = "can't be empty";
        return errors;
    };

    render() {
        const { cards, taskAdding, taskname } = this.state;
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;

        const classname = isActive ? 'card mb-2 bg-light box-shadow' : 'card mb-2 bg-white box-shadow';

        const form = (
            <div className="col">
                <input
                    type="text"
                    id="taskname"
                    name="taskname"
                    placeholder="Enter name"
                    value={taskname}
                    onChange={this.onChange}
                    className={
                        this.state.errors.taskname ? "form-control is-invalid" : "form-control"
                    }
                />
                <div className="invalid-feedback">{this.state.errors.taskname}</div>
                <button className="btn btn-primary" onClick={this.addTask}>Add new task</button>
                <button className="btn btn-primary" onClick={this.toggleAdding}>Close</button>
            </div>
        )

        return connectDropTarget(
            <div className={classname}>
                {cards.map((card, i) => {
                    return (
                        <Card
                            key={card._id}
                            index={i}
                            listId={this.props.id}
                            groupId={this.props.groupId}
                            card={card}
                            ToggleTaskModal={this.props.ToggleTaskModal}
                            setEditTaskName={this.props.setEditTaskName}
                            removeCard={this.removeCard.bind(this)}
                            moveCard={this.moveCard.bind(this)} />
                    );
                })}
                <div className="card-footer">{(taskAdding) ? form : <div onClick={this.toggleAdding.bind(this)}>Add new task</div> }</div>
            </div>
        );
    }
}

const cardTarget = {
    drop(props, monitor, component) {
        const { id } = props;
        const sourceObj = monitor.getItem();
        if (id !== sourceObj.listId) component.pushCard(sourceObj.card);
        return {
            listId: id
        };
    }
}

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(Container);