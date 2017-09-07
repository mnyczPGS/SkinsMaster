import * as actionType from './ActionType';

export const addCounter = () => ({
  type: actionType.ADD_COUNTER,
  payload: 1
});

export const removeCounter = () => ({
  type: actionType.REMOVE_COUNTER,
  payload: 1
});

export const showAlert = (text) => ({
  type: actionType.SHOW_ALERT,
  hidden: false,
  text: text
});

export const hideAlert = () => ({
  type: actionType.HIDE_ALERT,
  hidden: true
});