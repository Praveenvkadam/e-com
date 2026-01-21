export const selectUserState = (state) => state.auth;

export const selectUser = (state) =>
  selectUserState(state).user;

export const selectUserStatus = (state) =>
  selectUserState(state).status;
