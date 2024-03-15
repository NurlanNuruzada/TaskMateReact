import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    WorkspaceId: null,
    BorderId: null,
    UserId: null,
};
export const WorkspaceAndBoardSlice = createSlice({
    name: "MainData",
    initialState,
    reducers: {
        MainAction: (state, action) => {
            console.log(action);
            state.WorkspaceId = action
            state.BorderId = action
            state.refreshTokenExpiration = action
        },
    },
});
// Export actions and reducer
export const { MainAction } = WorkspaceAndBoardSlice.actions;
export default WorkspaceAndBoardSlice.reducer;
