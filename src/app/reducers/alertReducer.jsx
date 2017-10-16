import * as actionType from '../actions/ActionType';

const alertReducer = (state = { hidden: true, text: '' }, action) => {
  let newState;
  switch (action.type) {
    case actionType.SHOW_ALERT:
      return newState = {
        hidden: action.hidden,
        text: action.text
      };
    case actionType.HIDE_ALERT:
      return newState = {
        hidden: action.hidden,
        text: ''
      };
    default:
      return state
  }
}

export default alertReducer;