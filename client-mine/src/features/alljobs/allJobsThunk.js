import customFetch from "../../utils/axios";

export const getAllStatsThunk = async (_, thunkAPI) => {
  try {
    // console.log("done")
    const { data } = await customFetch.get("/jobs/stats");
    // console.log(data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const getAllJobsThunk = async (_, thunkAPI) => {
  const { search, searchStatus, searchType, sort, page } =
    thunkAPI.getState().allJobs;
  try {
    const url = `/jobs/?search=${search}&status=${searchStatus}&sort=${sort}&jobType=${searchType}&page=${page}`;
    const { data } = await customFetch.get(url);
    // console.log(data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
