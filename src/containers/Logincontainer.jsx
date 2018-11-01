import React, { Component } from 'react';
import Login from '../components/Login';

export default class LoginContainer extends Component {

  render() {
    return (
      <div>
        <div className='container' >
          <Login />
        </div>
      </div>
    )
  }
}
