import {
  createSlice
} from "@reduxjs/toolkit";

const actualResolutionDataContext = createSlice({
  name: "actualResolutionData",

  initialState: {
    actualResolutionName: "",
    resolutionIndex: null,
  },
  reducers: {
    addActualResolution(state, action) {
      state.actualResolutionName = action.payload.resolutionName;
    },
    addNewResolutionIndex(state, action) {
      state.resolutionIndex = action.payload.index;
    }
  },
});

export const actualResolutionDataActions = actualResolutionDataContext.actions;

export default actualResolutionDataContext;