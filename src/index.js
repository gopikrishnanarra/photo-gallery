import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {combineReducers, createStore} from 'redux'
import Container from './containers/container'
import './index.css';
import reducers from './reducers/reducer'

const store = createStore(combineReducers({
    data: reducers,
}));
ReactDOM.render(
    <Provider store={store}><Container /></Provider>,
    document.getElementById('root')
);
