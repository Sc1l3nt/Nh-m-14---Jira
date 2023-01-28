import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { http } from "../../Utils/config";
import { DispatchType } from "../configStore";

const initialState = {
  projectList: [],
  projectCategories: [],
  projectMembers: [],
  projectDetail: null,
  error: null,
};

const projectReducer = createSlice({
  name: "projectReducer",
  initialState,
  reducers: {
    getAllProjectAction: (state, action) => {
      state.projectList = action.payload;
    },
    deleteProjectAction: (state, action) => {
      state.projectList = action.payload;
    },
    searchProjectAction: (state, action) => {
      state.projectList = action.payload;
    },
  },
});

export const { getAllProjectAction, deleteProjectAction, searchProjectAction } =
  projectReducer.actions;

export default projectReducer.reducer;

export const getAllProjectApi = () => {
  return async (dispatch: DispatchType) => {
    const result = await http.get(`/Project/getAllProject`);
    const action = getAllProjectAction(result.data.content);
    dispatch(action);
  };
};

export const deleteProjectApi = (projectId: number) => {
  return async (dispatch: DispatchType) => {
    const result = await http.delete(
      `/Project/deleteProject?projectId=${projectId}`
    );
    const action = deleteProjectAction(result.data.content);
    dispatch(action);
    notification.success({
      message: `Project deleted successfully`,
    });
  };
};

export const searchProjectApi = (keyword: any) => {
  return async (dispatch: DispatchType) => {
    const result = await http.get(`/Project/getAllProject?keyword=${keyword}`);
    const action = getAllProjectAction(result.data.content);
    dispatch(action);
  };
};
