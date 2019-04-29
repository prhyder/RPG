import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers'; //Get the State from the reducers

export default function configureStore(initialState) {
	const middlewares = [
		thunk
	];

	const store = createStore(reducer, initialState, compose(
		applyMiddleware(...middlewares),
		window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
	)
	);

	return store;
}
