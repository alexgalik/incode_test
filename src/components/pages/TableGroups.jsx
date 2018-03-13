import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';

class TableGroups extends Component {

    state = {
        list: []
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.list) {
            this.setState({
              list: nextProps.list
            });
          }
          console.log(nextProps)
    }
    onSortEnd({ oldIndex, newIndex }) {
        this.setState({
            list: arrayMove(this.state.list, oldIndex, newIndex)
        });
        this.props.updateGroups(this.state.list);
    }



    render() {
        const DragHandle = SortableHandle(({ name }) => <div className="card-header">{name}</div>);

        const SortableItem = SortableElement(({ value }) => { return (<div className="col-md-2" key={value._id}><DragHandle name={value.name} /><Container id={value._id} name={value.name} list={value.tasks} updateTasks={this.props.updateTasks}/></div>) });

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