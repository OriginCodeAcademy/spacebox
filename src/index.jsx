import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* eslint-disable no-underscore-dangle */
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(
    promiseMiddleware()
  )
));
/* eslint-enable */

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
