import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TeamMember {
  _id?: string;
  name?: string;
  status?: string;
  currentSessionSeconds?: number;
  totalTodaySeconds?: number;
  thisWeekSeconds?: number;
  thisMonthSeconds?: number;
  [key: string]: any;
}

interface TeamState {
  data: TeamMember[];
}

const initialState: TeamState = {
  data: [],
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeamData: (state, action: PayloadAction<TeamMember[]>) => {
      state.data = action.payload;
    },
    updateLiveTimers: (state) => {
      state.data = state.data.map((emp) => {
        if (emp.status === "Active") {
          return {
            ...emp,
            currentSessionSeconds: (emp.currentSessionSeconds || 0) + 1,
            totalTodaySeconds: (emp.totalTodaySeconds || 0) + 1,
          };
        }
        return emp;
      });
    },
  },
});

export const { setTeamData, updateLiveTimers } = teamSlice.actions;
export default teamSlice.reducer;