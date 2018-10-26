import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route, Switch
} from 'react-router-dom';

import MainApp from './routes/HomeContainer';
import AdminContainer from './routes/AdminContainer';

export default class Routes extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path='/' component={MainApp} />
					<Route path='/dashboard' component={AdminContainer} />
				</Switch>
			</Router >
		)
	}
};