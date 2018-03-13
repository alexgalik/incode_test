import React, { Component, Fragment } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';

class TableGroups extends Component {

    state = {
        list: [
            {
                id: 1,
                name: "Todo",
                tastks: [
                    { id: 1, text: "Item 1" },
                    { id: 2, text: "Item 2" },
                    { id: 3, text: "Item 3" }
                ]
            },
            {
                id: 2,
                name: "Done",
                tastks: [
                    { id: 4, text: "Item 4" },
                    { id: 5, text: "Item 5" },
                    { id: 6, text: "Item 6" }
                ]
            },
            {
                id: 3,
                name: "Plan",
                tastks: [
                    { id: 7, text: "Item 7" },
                    { id: 8, text: "Item 8" },
                    { id: 9, text: "Item 9" }
                ]
            },
            {
                id: 4,
                name: "text",
                tastks: [
                    { id: 10, text: "Item 10" },
                    { id: 11, text: "Item 11" },
                    { id: 13, text: "Item 13" },
                    { id: 12, text: "Item 12" }
                ]
            }
            // 'Box 1', 'Box 2', 'Box 3', 'Box 4'
        ]
    }

    onSortEnd({ oldIndex, newIndex }) {
        this.setState({
            list: arrayMove(this.state.list, oldIndex, newIndex)
        });
        console.log(this.state.list)
    }

    render() {
        const DragHandle = SortableHandle(({ name }) => <div className="card-header">{name}</div>);

        const SortableItem = SortableElement(({ value }) => { return (<div className="col-md-2" key={value.id}><DragHandle name={value.name} /><Container id={value.id} list={value.tastks} /></div>) });

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
            <div className="album py-5 bg-light">
                <SortableList items={this.state.list} onSortEnd={this.onSortEnd.bind(this)} axis='xy' useDragHandle={true} />
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(TableGroups);