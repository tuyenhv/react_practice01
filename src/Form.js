import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userName: '', 
      email: '',
      password: '',
      reEnterPassword: '',
      formErrors: {userName: '', email: '', password: '', reEnterPassword:''},
      userNameValid: false,
      emailValid: false,
      passwordValid: false,
      reEnterPassword: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let userNameValid = this.state.userNameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let checkPassword = '';
    let reEnterPasswordValid = this.state.reEnterPasswordValid;

    switch(fieldName) {
      case 'userName':
        userNameValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.userName = userNameValid ? '' : ' is invalid';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        checkPassword = value;
        break;
      case 'reEnterPassword':
        reEnterPasswordValid = (value =  checkPassword);
        fieldValidationErrors.reEnterPassword = reEnterPasswordValid ? '': 'The password does not match';
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    userNameValid: userNameValid,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    reEnterPasswordValid: reEnterPasswordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.userNameValid && this.state.emailValid && this.state.passwordValid && this.state.reEnterPassword});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render () {
    return (
      <form className="demoForm">
        <h2>Sign up</h2>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.userName)}`}>
          <label htmlFor="userName">User name</label>
          <input type="text" required className="form-control" name="userName"
            placeholder="Input the full name"
            value={this.state.userName}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Email address</label>
          <input type="email" required className="form-control" name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}  />
        </div>

        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleUserInput}  />
        </div>
        
        <div className={`form-group ${this.errorClass(this.state.formErrors.reEnterPassword)}`}>
          <label htmlFor="reEnterPassword">reEnterPassword</label>
          <input type="password" className="form-control" name="reEnterPassword"
            placeholder="Please Enter the Password again"
            value={this.state.reEnterPassword}
            onChange={this.handleUserInput}  />
        </div>

        <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Sign up</button>
      </form>
    )
  }
}

export default Form;