import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Search from '../components/Search';
import HomePage from '../components/HomePage';

export default class HomeContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='container' >
        <HomePage />
      </div>
    )
  }
}
