import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'
import rootReducer from "./reducers/rootReducer";
import App from "./app";

//Removed store folder since it's always only one store
const store = createStore(rootReducer, applyMiddleware(createLogger(),thunk));

//Program is inited here
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('main')
);



