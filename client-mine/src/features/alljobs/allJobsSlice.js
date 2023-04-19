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
  totalJobs: 0,
  numOfPages: 1,
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
      // console.log(
      //   state.search,
      //   state.searchStatus,
      //   state.sort,
      //   state.searchType
      // );
    },
    clearValues: (state) => {
      return {
        ...state,
        ...initialFiltersState,
      };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
      // console.log("change page")
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
        state.totalJobs = payload.totalJobs;
        state.numOfPages = payload.numOfPages;
        // console.log(state.numOfPages);
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

// console.log(allJobsSlice);
export const { handleChange, clearValues, changePage } = allJobsSlice.actions;
export default allJobsSlice.reducer;
