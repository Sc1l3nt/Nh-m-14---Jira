import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../Utils/config";
import { DispatchType } from "../configStore";

const initialState = {
  taskTypes: [],
  taskDetail: null,
  taskError: null,
};

const taskReducer = createSlice({
  name: "taskReducer",
  initialState,
  reducers: {
    getAllTaskTypesAction: (state, action) => {
      state.taskTypes = action.payload;
    },
    updateTaskStatusAction: (state, action) => {
      state.taskDetail = action.payload;
    },
  },
});

export const { getAllTaskTypesAction, updateTaskStatusAction } =
  taskReducer.actions;

export default taskReducer.reducer;

export const getAllTaskTypesApi = () => {
  return async (dispatch: DispatchType) => {
    const result = await http.get(`/TaskType/getAll`);
    const action = getAllTaskTypesAction(result.data.content);
    dispatch(action);
  };
};

export const updateTaskStatusApi = (taskId: number, statusId: number) => {
  return async (dispatch: DispatchType) => {
    const result = await http.put(`/Project/updateStatus`, {
      taskId,
      statusId,
    });
    const action = updateTaskStatusAction(result.data.content);
    dispatch(action);
  };
};
