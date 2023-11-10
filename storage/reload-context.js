import { createSlice } from "@reduxjs/toolkit";

const reloadContext = createSlice({
  name: "reload",

  initialState: {
    reloadNumber: 0,
  },
  reducers: {
    newReload(state, action) {
      state.reloadNumber = state.reloadNumber + 1;
    },
  },
});

export const reloadActions = reloadContext.actions;

export default reloadContext;
