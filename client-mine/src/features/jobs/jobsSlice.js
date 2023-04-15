import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const JobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    handleChange: (state, action) => {
      console.log("HANDLECHNGE");
    },
  },
});

console.log(JobsSlice);
export const { handleChange } = JobsSlice.actions;
export default JobsSlice.reducer;
