// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const token = sessionStorage.getItem("token");
const userRaw = sessionStorage.getItem("user");
let user = null;


try {
  if (userRaw && userRaw !== "undefined") {
    user = JSON.parse(userRaw);
  }
} catch (err) {
  console.error("Failed to parse user from sessionStorage", err);
  user = null;
}

const initialState = {
  token: token || null,
  user: user || null,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;

      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
