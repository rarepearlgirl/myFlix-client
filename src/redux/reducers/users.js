import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userProfile: null,
    token: null
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setUserToken: (state, action) => {
      state.token = action.payload;
    }
  }
})

export const { setUserProfile, setUserToken } = userSlice.actions;
export default userSlice.reducer;