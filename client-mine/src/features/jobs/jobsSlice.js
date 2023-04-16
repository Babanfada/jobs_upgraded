import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addJobThunk, deleteJobThunk, editJobThunk } from "./jobsSliceThunk";
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
export const editJob = createAsyncThunk("jobs/patchjobs", editJobThunk);
export const deleteJob = createAsyncThunk("jobs/deletejobs", deleteJobThunk);
// export const getSingleJob = createAsyncThunk(
//   "jobs/getSinglejob",
//   singleJobThunk
// );

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
    setEditJob: (state, { payload }) => {
      return {
        ...state,
        isEditing: true,
        editJobId: payload._id,
        ...payload,
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
        toast.success("Job Details Successfully Added!!!!!");
      })
      .addCase(addJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Details Succefully Edited!!!");
        
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.error("Job Details Succefully Deleted!!!");
        // toast.success(payload);
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

console.log(JobsSlice);
export const { handleChange, clearValues, setEditJob } = JobsSlice.actions;
export default JobsSlice.reducer;
