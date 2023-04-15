import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllStatsThunk } from "./allJobsThunk";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  stats: {},
  monthlyApplications: [],
};

export const getAllStats = createAsyncThunk(
  "allJobs/getAllStats",
  getAllStatsThunk
);
const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    handleChange: (state, action) => {
      console.log("HANDLECHNGE");
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(getAllStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStats.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
        state.isLoading = false;
      })
      .addCase(getAllStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

console.log(allJobsSlice);
export const { handleChange } = allJobsSlice.actions;
export default allJobsSlice.reducer;
