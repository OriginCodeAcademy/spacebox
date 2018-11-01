import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { updateUsername, updatePassword, postLogin } from './LoginActions';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  handleUsername(e) {
    const { dispatch } = this.props;
    dispatch(updateUsername(e.target.value));
  }

  handlePassword(e) {
    const { dispatch } = this.props;
    dispatch(updatePassword(e.target.value))
  }

  submitLogin(e) {
    e.preventDefault();
    const { dispatch, username, password } = this.props;
    dispatch(postLogin({ username, password }));
  }

  render() {
    if (this.props.token) {
      return <Redirect push to='/dashboard' />
    }
    return (
      <section id='main'>
        <div>
          <h1 className='glitch' data-text='LOGIN' style={{text:'center'}} id='header'>LOGIN</h1>
        </div>
        <form onSubmit={this.submitLogin}>
          <div className='grid'>
            <label className='label' htmlFor='username'>Username:</label>
            <input className='input' id='username' name='username' type='text' onChange={this.handleUsername} />
            <label className='label' htmlFor='password'>Password:</label>
            <input className='input' id='password' name='password' type='password' onChange={this.handlePassword} />
          </div>
          <div>
            <button className='submit' id='submit'>Submit</button>
          </div>
        </form>
      </section>
    )
  }
}
