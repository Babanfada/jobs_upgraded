import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearValues } from "./jobsSlice";
// import { toast } from "react-toastify";
export const addJobThunk = async (info, thunkAPI) => {
  try {
    const { data } = await customFetch.post("/jobs", info);
    thunkAPI.dispatch(clearValues());
    console.log(data);
    return data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const editJobThunk = async (info, thunkAPI) => {
  try {
    const { data } = await customFetch.patch(`/jobs/${info[0]}`, info[1]);
    thunkAPI.dispatch(clearValues());
    console.log(data);
    return data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const deleteJobThunk = async (jobId, thunkAPI) => {
  try {
    const { data } = await customFetch.delete(`/jobs/${jobId}`);
    thunkAPI.dispatch(clearValues());
    console.log(data);
    return data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

