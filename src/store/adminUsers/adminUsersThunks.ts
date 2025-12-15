import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, API_BASE_URL } from "@/lib/axios";
import type { AdminUser } from "./adminUsersSlice";

type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
};
export const fetchUsers = createAsyncThunk<
  AdminUser[],
  void,
  { rejectValue: string }
>("adminUsers/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get(
      `${API_BASE_URL}/api/v1/employee`
    );

    return res.data.users;
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || "Failed to fetch users"
    );
  }
});

export const createUser = createAsyncThunk<
  AdminUser,
  CreateUserPayload,
  { rejectValue: string }
>("adminUsers/createUser", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post(
      `${API_BASE_URL}/api/v1/employee/add`,
      payload
    );
   

    return {
      id: res.data?.id ?? Date.now().toString(),
      name: payload.name,
      email: payload.email,
    };
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || "Failed to create user"
    );
  }
});
