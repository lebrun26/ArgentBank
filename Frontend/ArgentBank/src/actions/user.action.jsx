export const GET_USER = "GET_USER";

export const setUser = (user) => ({
  type: GET_USER,
  payload: user,
});

//ENG: Modification of the store with the new Username value
// FR: Modification du store avec la nouvelle valeur de Username
export const EDIT_USERNAME = "EDIT_USERNAME";

export const editUsername = (edit) => ({
  type: EDIT_USERNAME,
  payload: edit,
});
