import { createSlice } from "@reduxjs/toolkit";

const directorsSlice = createSlice({
  name: "directors",
  initialState: [],
  reducers: {
    setDirectors: (state, action) => {
      return action.payload;
    }
  }
});

export const { setDirectors } = directorsSlice.actions;
export default directorsSlice.reducer;