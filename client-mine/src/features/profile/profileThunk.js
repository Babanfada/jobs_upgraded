import customFetch from "../../utils/axios";

export const uploadFileThunk = async (avatar, thunkAPI) => {
  try {
    const {
      data: {
        image: { src },
      },
    } = await customFetch.post("/auth/upload", avatar);
    // console.log(src);
    return src;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
