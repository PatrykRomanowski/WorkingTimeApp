import { configureStore } from "@reduxjs/toolkit";

import reloadContext from "./reload-context";

const store = configureStore({
  reducer: {
    reloadStatus: reloadContext.reducer,
  },
});

export default store;
