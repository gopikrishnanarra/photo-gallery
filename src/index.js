import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App'
import { Provider } from 'react-redux'
// import {combineReducers, createStore} from 'redux'
import Container from './containers/container'
import './index.css';
// import reducers from './reducers/reducer'

// const store = createStore(combineReducers({
//     data: reducers,
// }));
ReactDOM.render(
    <App />,
  document.getElementById('root')
);
