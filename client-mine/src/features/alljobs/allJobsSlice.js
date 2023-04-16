import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllJobsThunk, getAllStatsThunk } from "./allJobsThunk";
import { toast } from "react-toastify";
const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};
const initialState = {
  isLoading: false,
  jobs: [],
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllStats = createAsyncThunk(
  "allJobs/getAllStats",
  getAllStatsThunk
);
export const getAllJobs = createAsyncThunk(
  "allJobs/getAllJobs",
  getAllJobsThunk
);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
      console.log(
        state.search,
        state.searchStatus,
        state.sort,
        state.searchType
      );
    },
    clearValues: (state) => {
      return {
        ...state,
        ...initialFiltersState,
      };
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
      })
      .addCase(getAllJobs.pending, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
        // toast.error(payload);
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

console.log(allJobsSlice);
export const { handleChange, clearValues } = allJobsSlice.actions;
export default allJobsSlice.reducer;
