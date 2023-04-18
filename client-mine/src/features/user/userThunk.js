import customFetch from "../../utils/axios";
import { logOutUser } from "./userSlice";
const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const { data } = await customFetch.post(url, user);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const { data } = await customFetch.post(url, user);
    // console.log(thunkAPI);
    return data;
  } catch (error) {
    //  console.log(thunkAPI.rejectWithValue(error.response.data.msg));
    return thunkAPI.rejectWithValue(error.response.data.msg);
    // console.log(error);
  }
};
const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const { data } = await customFetch.patch(url, user);
    // console.log(thunkAPI);
    return data;
  } catch (error) {
    //  console.log(thunkAPI.rejectWithValue(error.response.data.msg));
    return thunkAPI.rejectWithValue(error.response.data.msg);
    // console.log(error);
  }
};

const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logOutUser(message));
    return Promise.resolve();
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data.msg);
    return Promise.reject();
  }
};

export { registerUserThunk, loginUserThunk, clearStoreThunk, updateUserThunk };
