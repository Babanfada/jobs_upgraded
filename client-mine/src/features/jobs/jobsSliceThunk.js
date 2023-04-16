import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearValues } from "./jobsSlice";
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
