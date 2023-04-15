import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    handleToggle: (state, action) => {
      state.isMember = !state.isMember;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
      console.log(state.name, state.email, state.password, state.isMember);
    },
  },
});

console.log(profileSlice);
export const { handleToggle, handleChange } = profileSlice.actions;
export default profileSlice.reducer;
