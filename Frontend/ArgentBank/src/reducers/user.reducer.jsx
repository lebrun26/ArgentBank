import { GET_USER } from "../actions/user.action";

const initialState = {
  user: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
