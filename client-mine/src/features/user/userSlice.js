import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  registerUserThunk,
  loginUserThunk,
  clearStoreThunk,
} from "../user/userThunk";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import { toast } from "react-toastify";

const initialState = {
  isSideBarOpen: false,
  isResizeSideBarOpen: false,
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI);
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI);
  }
);

export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSideBar: (state, action) => {
      state.isSideBarOpen = !state.isSideBarOpen;
      console.log(state.isSideBarOpen);
    },
    resizeSideBar: (state, action) => {
      state.isResizeSideBarOpen = window.innerWidth <= 981;
      console.log(state.isResizeSideBarOpen);
    },
    logOutUser: (state, { payload }) => {
      state.user = null;
      state.isSideBarOpen = false;
      state.isResizeSideBarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }

      // console.log(user);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.isLoading = false;
        addUserToLocalStorage(user);
        state.user = user;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.isLoading = false;
        addUserToLocalStorage(user);
        state.user = user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
      });
  },
});

console.log(userSlice);
export const { toggleSideBar, resizeSideBar, logOutUser } = userSlice.actions;
export default userSlice.reducer;
