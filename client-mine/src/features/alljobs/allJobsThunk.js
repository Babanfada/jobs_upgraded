import customFetch from "../../utils/axios";

export const getAllStatsThunk = async (_, thunkAPI) => {
  try {
    // console.log("done")
    const { data } = await customFetch.get("/jobs/stats");
    console.log(data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
