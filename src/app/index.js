import '../scss/index.scss';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import reducer from './reducers';
import {Bootstrap, Grid, Row, Col} from 'reactstrap';

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducer, enhancers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);