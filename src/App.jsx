import React, { Component } from 'react';
import {
	HashRouter as Router,
	Route, Switch
} from 'react-router-dom';

import HomeContainer from './containers/HomeContainer';
import AdminContainer from './containers/AdminContainer';

export default class Routes extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path='/' component={HomeContainer} />
					<Route path='/dashboard' component={AdminContainer} />
				</Switch>
			</Router>
		)
	}
};