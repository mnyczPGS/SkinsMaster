import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import alertReducer from './alertReducer';
import steamIdReducer from './steamIdReducer';

const counterApp = combineReducers({
  counterReducer, 
  alertReducer, 
  steamIdReducer
})

export default counterApp;