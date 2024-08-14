import { GET_TOKEN } from "../actions/login.action";

const initialState = {
  token: null,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}
