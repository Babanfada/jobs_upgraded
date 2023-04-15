import { configureStore } from "@reduxjs/toolkit";
import allJobsReducer from "./src/features/alljobs/allJobsSlice";
import JobsReducer from "./src/features/jobs/jobsSlice";
import profileReducer from "./src/features/profile/profileSlice";
import userReducer from "./src/features/user/userSlice";

const store = configureStore({
  reducer: {
    allJobs: allJobsReducer,
    jobs: JobsReducer,
    profile: profileReducer,
    user: userReducer,
  },
});
export default store;
