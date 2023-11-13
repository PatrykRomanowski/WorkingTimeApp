import {
  configureStore
} from "@reduxjs/toolkit";

import reloadContext from "./reload-context";
import actualResolutionDataContext from "./actualResolutionData-context";

const store = configureStore({
  reducer: {
    reloadStatus: reloadContext.reducer,
    actualResolution: actualResolutionDataContext.reducer,
  },
});

export default store;