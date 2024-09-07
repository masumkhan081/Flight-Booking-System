import { configureStore } from "@reduxjs/toolkit";

import userSlice from "../slices/User";
import adminViewSlice from "../slices/adminView";

export default configureStore({
  reducer: {
    user: userSlice,
    adminView: adminViewSlice,
  },
});
