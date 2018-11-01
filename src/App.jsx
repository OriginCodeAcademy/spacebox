import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route, Switch
} from 'react-router-dom';

import HomeContainer from './containers/HomeContainer';
import AdminContainer from './containers/AdminContainer';
import LoginContainer from './containers/Logincontainer';
import RoomContainer from './containers/RoomContainer';

export default class Routes extends Component {
  render() {
    return (
      <Router>
				<Switch>
					<Route exact path='/' component={HomeContainer} />
          <Route path='/admin' component={LoginContainer} />
					<Route path='/dashboard' component={AdminContainer} />
					<Route path='/room/:queueId' component={RoomContainer} />
				</Switch>
			</Router >
		)
	}
};
