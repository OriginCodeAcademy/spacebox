import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Search from '../components/Search';
import Login from '../components/Login/';

export default class LoginContainer extends Component {
  constructor() {
    super();
  }


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