import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  registerUserThunk,
  loginUserThunk,
  clearStoreThunk,
  updateUserThunk,
  updateProfileThunk,
} from "../user/userThunk";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import { toast } from "react-toastify";

const updatedUser = {
  name: getUserFromLocalStorage()?.name || "",
  email: getUserFromLocalStorage()?.email || "",
  lastName: getUserFromLocalStorage()?.lastName || "",
  location: getUserFromLocalStorage()?.location || "",
  image: getUserFromLocalStorage()?.image || "",
};

const initialState = {
  isSideBarOpen: false,
  isResizeSideBarOpen: false,
  isLoading: false,
  user: getUserFromLocalStorage(),
  ...updatedUser,
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
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    return updateUserThunk("/auth/updateUser", user, thunkAPI);
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updatefile",
  updateProfileThunk
);

export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSideBar: (state, action) => {
      state.isSideBarOpen = !state.isSideBarOpen;
      // console.log(state.isSideBarOpen);
    },
    resizeSideBar: (state, action) => {
      state.isResizeSideBarOpen = window.innerWidth <= 981;
      // console.log(state.isResizeSideBarOpen);
    },
    logOutUser: (state, { payload }) => {
      state.user = null;
      state.isSideBarOpen = false;
      state.isResizeSideBarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
    updateUserProfile: (state, { payload: { name, value } }) => {
      state[name] = value;
      // console.log(state.name, state.email, state.location, state.lastName);
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
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.isLoading = false;
        addUserToLocalStorage(user);
        state.user = user;
        toast.success("Profile Succefully Updated!!!!");
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateProfile.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.image = payload;
        // addUserToLocalStorage(user);
        toast.success("Image update was a success !!!!");
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

console.log(userSlice);
export const { toggleSideBar, resizeSideBar, logOutUser, updateUserProfile } =
  userSlice.actions;
export default userSlice.reducer;
