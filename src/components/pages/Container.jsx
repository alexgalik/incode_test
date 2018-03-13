import React, { Component } from 'react';
import update from 'react-addons-update';
import { DropTarget } from 'react-dnd';
import Card from './Card';


class Container extends Component {
    state = {
        id: this.props.id,
        name: this.props.name,
        cards: this.props.list
    }
    pushCard(card) {
        this.setState(update(this.state, {
            cards: {
                $push: [card]
            }
        }));
        console.log("PushCard", this.state.cards)
    }
    removeCard(index) {
        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [index, 1]
                ]
            }
        }));
        console.log('removeCard', this.state.cards);
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
        console.log("MoveCard", this.state.cards)
    }
    render() {
        const { cards, name } = this.state;
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;

        const classname = isActive ? 'card mb-2 bg-light box-shadow' : 'card mb-2 bg-white box-shadow';

        return connectDropTarget(
            <div className={classname}>
                {cards.map((card, i) => {
                    return (
                        <Card
                            key={card.id}
                            index={i}
                            listId={this.props.id}
                            card={card}
                            removeCard={this.removeCard.bind(this)}
                            moveCard={this.moveCard.bind(this)} />
                    );
                })}
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