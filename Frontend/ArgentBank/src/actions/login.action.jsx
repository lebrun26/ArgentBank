export const GET_TOKEN = "GET_TOKEN";

export const setToken = (token) => ({
  type: GET_TOKEN,
  payload: token,
});
