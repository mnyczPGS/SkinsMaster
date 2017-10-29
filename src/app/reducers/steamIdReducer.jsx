import * as actionType from '../actions/ActionType';

const steamIdReducer = (state = {id: null, name: '', avatar: '' }, action) => {
  let newState;
  switch (action.type) {
    case actionType.SET_STEAM_ID:
      return newState = {
        id: action.id,
        name: action.name,
        avatar: action.avatar
      };
    case actionType.DELETE_STEAM_ID:
      return newState = {
        id: null,
        name: '',
        avatar: ''
      };
    default:
      return state
  }
}

export default steamIdReducer;