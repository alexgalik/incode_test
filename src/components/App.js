import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginForm from './forms/LoginForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" exact component={LoginForm} />
      </div>
    );
  }
}

export default App;
