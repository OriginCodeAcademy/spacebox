import React from 'react';
import {
	BrowserRouter as Router,
	Route, Switch
} from 'react-router-dom';
import AdminContainer from './AdminContainer';


export default () => {
	<Router>
		<Switch>
			<Route path='/admin' component={AdminContainer} />
		</Switch>
	</Router>
};
