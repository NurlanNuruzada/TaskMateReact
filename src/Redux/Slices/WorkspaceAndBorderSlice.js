import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspaceId: null,
  BoardId: null,
  userId: null,
  refresh: 0 
};

export const WorkspaceAndBoardSlice = createSlice({
  name: "MainData",
  initialState,
  reducers: {
    setData: (state, action) => {
      return { ...state, ...action.payload };
    },
    incrementRefresh: (state) => {
      state.refresh += 1;
    },
  },
});

export const { setData, incrementRefresh } = WorkspaceAndBoardSlice.actions;
export default WorkspaceAndBoardSlice.reducer;
