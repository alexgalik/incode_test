import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/user';
import { fetchGroups, updateGroups, updateTasks, addGroup, editGroup, deleteGroup } from '../../actions/groups';
import TableGroups from './TableGroups';
import StaticPage from '../static/StaticPage';


class Dashboard extends Component {

  state = {
    user: this.props.user.email ? this.props.user.email : "",
    errors: ""
  };
  componentWillMount(){
		this.props.fetchGroups();
	}
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.email) {
      this.setState({
        user: nextProps.user.email
      });
    }
    this.setState({
      errors: nextProps.errors
    });
  }

  logOut = () => {
    this.setState({
      user: ""
    });
    this.props.logout();
    this.props.fetchGroups();
  };

  updateGroups = (groups) => {
    this.props.updateGroups(groups);
  }

  updateTasks = (groupId, tasks) => {
    const newTask = {
      groupId: groupId,
      tasks: tasks
    }
    this.props.updateTasks(newTask)  
  }

  addNewTask = (groupId, tasks) => {
    const newTask = {
      groupId: groupId,
      tasks: tasks
    }
    this.props.updateTasks(newTask)
    this.props.fetchGroups();   
  }

  addGroup = group => {
    this.props.addGroup(group);
  }

  editGroup = group => {
    this.props.editGroup(group)
    this.props.fetchGroups();
  }

  deleteGroup = groupId => {
    this.props.deleteGroup(groupId)
  }

  render() {
    return (
      <Fragment>
        <header>
          <nav className="navbar navbar-expand navbar-dark fixed-top bg-dark">
            <div
              className="collapse navbar-collapse justify-content-around"
              id="navbarCollapse"
            >
              <div className="navbar-brand">
                Welcome to Dashboard {this.state.user.split("@")[0]}
              </div>
              <div className="mt-2 mt-md-0 top-buttons">
                {(this.state.user === "")
                  ? <Link to='/login' className="btn btn-light my-2 my-sm-0">Sing in / Sing up</Link>
                  : <div className="btn btn-light my-2 my-sm-0" onClick={this.logOut}> Logout </div>}
              </div>
            </div>
          </nav>
        </header>
        <main>
          {(this.state.user !== "") ? <TableGroups 
            list={this.props.groups} 
            updateGroups={this.updateGroups} 
            updateTasks={this.updateTasks} 
            addNewTask={this.addNewTask} 
            addGroup={this.addGroup}
            editGroup={this.editGroup}
            deleteGroup={this.deleteGroup}
          /> : 
          <StaticPage list={this.props.groups} />
          }
          
        </main>
        
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    groups: state.groups.sort((a,b) => {
      if (a.groupIndex > b.groupIndex) {
        return 1;
      }
      if (a.groupIndex < b.groupIndex) {
        return -1;
      }
      return 0;
    }),
    errors: state.errors
  };
};

export default connect(mapStateToProps, {logout, fetchGroups, updateGroups, updateTasks, addGroup, editGroup, deleteGroup})(Dashboard);