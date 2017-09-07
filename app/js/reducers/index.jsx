import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import alertReducer from './alertReducer';

const counterApp = combineReducers({
  counterReducer, 
  alertReducer
})

export default counterApp;