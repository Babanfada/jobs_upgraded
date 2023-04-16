import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addJobThunk } from "./jobsSliceThunk";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const addJob = createAsyncThunk("jobs/postjobs", addJobThunk);

const JobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
      console.log(
        state.position,
        state.company,
        state.jobLocation,
        state.status,
        state.jobType
      );
    },
    clearValues: (state) => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(addJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addJob.fulfilled, (state) => {
        state.isLoading = false;
        if (state.isEditing) {
          toast.success("Job Details Successfully Edited!!!!!");
        }
        toast.success("Job Details Successfully Added!!!!!");
      })
      .addCase(addJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

console.log(JobsSlice);
export const { handleChange, clearValues } = JobsSlice.actions;
export default JobsSlice.reducer;
