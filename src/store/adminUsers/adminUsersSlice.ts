import { createSlice } from "@reduxjs/toolkit";
import { createUser } from "./adminUsersThunks";
import type { PayloadAction } from "@reduxjs/toolkit";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
};

type AdminUsersState = {
  users: AdminUser[];
  loading: boolean;
  error: string | null;
};

const initialState: AdminUsersState = {
  users: [],
  loading: false,
  error: null,
};

const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<AdminUser[]>) {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.unshift(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create user";
      });
  },
});

export const { setUsers } = adminUsersSlice.actions;
export default adminUsersSlice.reducer;
