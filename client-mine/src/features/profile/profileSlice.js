import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadFileThunk } from "./profileThunk";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  password: "",
  image: "",
  isMember: false,
  isLoading: false,
};

export const uploadFile = createAsyncThunk(
  "profile/uploadfile",
  uploadFileThunk
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    handleToggle: (state, action) => {
      state.isMember = !state.isMember;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
      // console.log(state.name, state.email, state.password, state.isMember,state.avatar);
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(uploadFile.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(uploadFile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // console.log(payload);
        state.image = payload;
        // console.log(state.avatar);
        toast.success("Image upload was a success");
      })
      .addCase(uploadFile.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

// console.log(profileSlice);
export const { handleToggle, handleChange } = profileSlice.actions;
export default profileSlice.reducer;
