import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";
import servicesReducer from "./slices/servicesSlice";
import adminUsersReducer from "./adminUsers/adminUsersSlice";
import teamReducer from "./teamSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    services: servicesReducer,
    adminUsers: adminUsersReducer,
    team : teamReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
