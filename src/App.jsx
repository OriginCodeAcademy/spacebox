import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route, Switch
} from 'react-router-dom';

import HomeContainer from './containers/HomeContainer';
import AdminContainer from './containers/AdminContainer';
import LoginContainer from './containers/LoginContainer';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Route exact path='/' component={HomeContainer} />
          <Route path='/dashboard' component={AdminContainer} />
          <Route path='/admin' component={LoginContainer} />
        </div>
      </Router>
    )
  }
};
