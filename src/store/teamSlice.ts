import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeamData: (state, action) => {
      state.data = action.payload;
    },
    updateLiveTimers: (state) => {
      state.data = state.data.map((emp) => {
        if (emp.status === "Active") {
          return {
            ...emp,
            currentSessionSeconds: emp.currentSessionSeconds + 1,
            totalTodaySeconds: emp.totalTodaySeconds + 1,
          };
        }
        return emp;
      });
    },
  },
});

export const { setTeamData, updateLiveTimers } = teamSlice.actions;
export default teamSlice.reducer;