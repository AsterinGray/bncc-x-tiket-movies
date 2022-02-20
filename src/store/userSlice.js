import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  session_id: "",
  request_token: "",
  data: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSessionId: (state, { payload }) => {
      state.session_id = payload;
    },
    setRequestToken: (state, { payload }) => {
      state.request_token = payload;
    },
    setUserData: (state, { payload }) => {
      state.data = payload;
    },
    clearUser: (state, { payload }) => {
      state.data = "";
      state.session_id = "";
    },
  },
});

export const { setSessionId, setRequestToken, setUserData } = userSlice.actions;

export default userSlice.reducer;
