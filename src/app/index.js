import '../scss/index.scss';
import 'bootstrap/scss/bootstrap.scss';
import 'reactstrap/dist/reactstrap.cjs.js'
import config from './../../config';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import reducer from './reducers';
import {Bootstrap, Grid, Row, Col} from 'reactstrap';
import * as firebase from 'firebase';

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducer, enhancers);
firebase.initializeApp(config.firebaseConfig)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);