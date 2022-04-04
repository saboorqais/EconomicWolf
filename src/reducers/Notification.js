import { GET_NOTIFICATIONS } from "../actions/Notifications";

export default (state = [], action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return Object.assign({}, state, {
        payload: action.payload,
      });
    default:
      return state;
  }
};
