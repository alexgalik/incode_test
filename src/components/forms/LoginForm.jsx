import React, { Component } from 'react';
import { connect } from "react-redux";
import Validator from "validator";
import { login } from "../../actions/user";
import history from "../../history";

class LoginForm extends Component {
  state = {
    user: {
      email: "",
      password: ""
    },
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: nextProps.errors
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.user);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.login(this.state.user).then(() => {
        if (!this.state.errors.global) {
          history.push('/');
        }
      });
    }
  };
  validate = user => {
    let errors = {};
    if (!Validator.isEmail(user.email)) errors.email = "Invalid email";
    if (!user.password) errors.password = "can't be empty pass";
    return errors;
  };
  onChange = e => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    });
  };
  render() {
    const { user, errors } = this.state;
    return (
      <div className="loginpage">
        <div className="container">
          <div className="row align-items-center" >
            <div className="col">
              <div className="card">
                <h2 className="card-header">Welcome!</h2>
                <div className="card-body">
                  <div className="text-left">
                    <form onSubmit={this.onSubmit}>
                      {errors.global && (
                        <div className="alert alert-danger">{errors.global}</div>
                      )}

                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Enter email"
                          value={user.email}
                          onChange={this.onChange}
                          className={
                            errors.email ? "form-control is-invalid" : "form-control"
                          }
                        />
                        <div className="invalid-feedback">{errors.email}</div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Password"
                          value={user.password}
                          onChange={this.onChange}
                          className={
                            errors.password ? "form-control is-invalid" : "form-control"
                          }
                        />
                        <div className="invalid-feedback">{errors.password}</div>
                      </div>

                      <button type="submit" className="btn btn-primary btn-block">Login / Register</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

export default connect(mapStateToProps, { login })(LoginForm);