import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Folder = {
  id: string;
  name: string;
  createdAt: Date;
  workspaceId: string | null;
  _count: {
    videos: number;
  };
};

type FolderState = {
  folders: Folder[];
};

const initialState: FolderState = {
  folders: [],
};

const folders = createSlice({
  name: "folders",
  initialState,
  reducers: {
    FOLDERS: (state, action: PayloadAction<Folder[]>) => {
      state.folders = action.payload;
    },
  },
});

export const { FOLDERS } = folders.actions;

export default folders.reducer;
