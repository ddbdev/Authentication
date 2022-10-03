import { configureStore, createSlice } from "@reduxjs/toolkit";

const localAuthenticatedHeader = localStorage.getItem("Authenticated");
const localAuthorizationHeader = localStorage.getItem("Authorization");

const initialState = {
  Authenticated: localAuthenticatedHeader,
  Authorization: localAuthorizationHeader,
};

const headerSlice = createSlice({
  name: "headers",
  initialState,
  reducers: {
    setHeaderOnLogin(state, action) {
      console.log(action);
      localStorage.setItem("Authorization", action.payload.Authorization);
      localStorage.setItem("Authenticated", action.payload.Authenticated);
    },
    setHeaderOnLogout(state) {
      localStorage.removeItem("Authenticated");
      localStorage.removeItem("Authorization");
    },
  },
});

const store = configureStore({
  reducer: headerSlice.reducer,
});

export const headersAction = headerSlice.actions;
export default store;
