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

export interface CategoryModel {
  id: number;
  projectCategoryName: string;
}

// ProjectModel == ProjectDetailModel
export interface ProjectModel {
  members: [];
  creator: {
    id: number;
    name: string;
  };
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  alias: string;
  deleted: boolean;
}

export interface MemberModel {
  userId: number;
  name: string;
  avatar: string;
}

export interface ProjectCreateModel {
  projectName: string;
  description: string;
  categoryId: number;
}

export interface ProjectEditModel {
  id: number;
  projectName: string;
  description: string;
  categoryId: any;
}

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
    getAllProjectCategoryAction: (state, action) => {
      state.projectCategories = action.payload;
    },
    createProjectAction: (state, action) => {
      state.projectDetail = action.payload;
    },
    createProjectAuthorizeAction: (state, action) => {
      state.projectDetail = action.payload;
    },
    getProjectDetailAction: (state, action) => {
      state.projectDetail = action.payload;
    },
    updateProjectAction: (state, action) => {
      state.projectDetail = action.payload;
    },
  },
});

export const {
  getAllProjectAction,
  deleteProjectAction,
  searchProjectAction,
  getAllProjectCategoryAction,
  createProjectAction,
  createProjectAuthorizeAction,
  getProjectDetailAction,
  updateProjectAction,
} = projectReducer.actions;

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
    window.location.reload();
  };
};

export const searchProjectApi = (keyword: any) => {
  return async (dispatch: DispatchType) => {
    const result = await http.get(`/Project/getAllProject?keyword=${keyword}`);
    const action = getAllProjectAction(result.data.content);
    dispatch(action);
  };
};

export const getAllProjectCategoryApi = () => {
  return async (dispatch: DispatchType) => {
    const result = await http.get(`/ProjectCategory`);
    const action = getAllProjectCategoryAction(result.data.content);
    dispatch(action);
  };
};

export const createProjectAuthorizeApi = (project: ProjectCreateModel) => {
  return async (dispatch: DispatchType) => {
    const result = await http.post(`Project/createProjectAuthorize`, project);
    const action = createProjectAuthorizeAction(result.data.content);
    dispatch(action);
    notification.success({
      message: `Project created successfully`,
    });
  };
};
