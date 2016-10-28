import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import App from './App.js';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

const initialState = store.getState();

ReactDOM.render(
  <Provider store = { store }>
    <App />
  </Provider>,
    document.getElementById('root')
  )
