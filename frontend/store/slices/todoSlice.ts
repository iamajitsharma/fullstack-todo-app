//import node modules libraries
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//import custom types
import { Task } from "@/types/task";

type InitialState = {
  selectedTask: Task | null;
  isTaskModalOpen?: boolean;
};

const initialState: InitialState = {
  selectedTask: null,
  isTaskModalOpen: false,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload;
    },
    setIsTaskModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isTaskModalOpen = action.payload;
    },
  },
});

export const { setSelectedTask, setIsTaskModalOpen } = todoSlice.actions;

export default todoSlice.reducer;
