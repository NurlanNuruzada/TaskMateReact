import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    fullname: null,
    userName: null,
    email: null,
    expireDate: null,
    refreshToken: null,
    refreshTokenExpiration: null,
    userJob:null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.token = action.payload.data.token
      state.fullname = action.payload.data.fullname
      state.username =  action.payload.data.username
      state.email =  action.payload.data.email
      state.expireDate = action.payload.data.expireDate
      state.refreshToken =  action.payload.data.refreshToken
      state.refreshTokenExpiration =  action.payload.data.refreshTokenExpiration
    },
    setUsetJobAction:(state,action)=>{
      state.userJob = action.payload.data.Role
    },
    logoutAction: (state, action) => {
      return initialState;
    },
    registerAction: (state, action) => {
      return action.payload;
    },
  },
});

// Export actions and reducer
export const { loginAction, logoutAction, registerAction } = AuthSlice.actions;
export default AuthSlice.reducer;
