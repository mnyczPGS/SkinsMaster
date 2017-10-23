import * as actionType from '../actions/ActionType';

const steamIdReducer = (state = {id: null }, action) => {
  let newState;
  switch (action.type) {
    case actionType.SET_STEAM_ID:
      return newState = {
        id: action.id
      };
    case actionType.DELETE_STEAM_ID:
      return newState = {
        id: action.id
      };
    default:
      return state
  }
}

export default steamIdReducer;