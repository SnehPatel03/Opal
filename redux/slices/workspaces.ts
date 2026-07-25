import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Workspace = {
  id: string;
  name: string;
  type: "PERSONAL" | "PUBLIC";
};

type WorkspaceState = {
  workspaces: Workspace[];
};

const initialState: WorkspaceState = {
  workspaces: [],
};

const workspaces = createSlice({
  name: "workspaces",
  initialState,
  reducers: {
    WORKSPACES: (state, action: PayloadAction<Workspace[]>) => {
      state.workspaces = action.payload;
    },
  },
});

export const { WORKSPACES } = workspaces.actions;

export default workspaces.reducer;