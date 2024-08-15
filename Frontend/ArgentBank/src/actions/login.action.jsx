export const GET_TOKEN = "GET_TOKEN";

export const setToken = (token) => ({
  type: GET_TOKEN,
  payload: token,
});

// Suppression du token dans le store
export const CLEAR_TOKEN = "CLEAR_TOKEN";

export const clearToken = () => {
  return {
    type: "CLEAR_TOKEN",
  };
};
