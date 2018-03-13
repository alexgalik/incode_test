import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/user';
import { fetchGroups, updateGroups, updateTasks } from '../../actions/groups';
import TableGroups from './TableGroups';


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
    console.log(this.state)
  }

  logOut = () => {
    this.setState({
      user: ""
    });
    this.props.logout();
  };

  updateGroups = (groups) => {
    this.props.updateGroups(groups);
  }

  updateTasks = (name, tasks) => {
    const newTask = {
      name: name,
      tasks: tasks
    }
    this.props.updateTasks(newTask)    
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
          <TableGroups list={this.props.groups} updateGroups={this.updateGroups} updateTasks={this.updateTasks}/>
        </main>
        
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    groups: state.groups,
    errors: state.errors
  };
};

export default connect(mapStateToProps, {logout, fetchGroups, updateGroups, updateTasks})(Dashboard);