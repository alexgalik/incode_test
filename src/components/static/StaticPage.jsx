import React, { Component } from 'react';
import history from "../../history";

export default class StaticPage extends Component {
    state = {
        list: []
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.list) {
            this.setState({
                list: nextProps.list
            });
        }
    }
    toLogin = () => {
        history.push('/login');
    }
    render() {
        return (
            <div className="album py-5 bg-light">
                <div className="contrainer">
                    <div className="row">
                        {this.state.list.map(item => {
                            return (
                                <div className="col-md-2" key={item._id}>
                                    <div className="container groupheader">
                                        <div className="row align-items-center">
                                            <div className="col-8">
                                                <div className="card-header">{item.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-2 bg-light box-shadow">
                                        {item.tasks.map(task => {
                                            return <div className="post" key={task.taskId} onClick={this.toLogin}>{task.title}</div>
                                        })}
                                        <div className="card-footer"></div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
