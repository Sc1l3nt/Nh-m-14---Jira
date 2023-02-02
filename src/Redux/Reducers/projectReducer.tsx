import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { http } from "../../Utils/config";
import { DispatchType } from "../configStore";
import { AddUserModel } from "./userReducer";

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
  id: any;
  projectName: string;
  description: string;
  categoryId: any;
}

// export interface ProjectState {
//   categoryProject: category[];
//   createProject: Project;
//   allProjects: projectAll[];
//   statusTask: Status[];
//   taskType: TypeTask[];
//   Priority: PriorityTask[];
//   projectDetail: ProjectDetail[];
//   projectEdit: ProjectEdit;
//   detailProjectById: TypeProjectDetail;
// }

// export interface CreateTypeTask {
//   listUserAsign?: number[];
//   taskName?: string;
//   description?: string;
//   statusId?: string;
//   originalEstimate?: number;
//   timeTrackingSpent?: number;
//   timeTrackingRemaining?: number;
//   projectId?: number;
//   typeId?: number | string;
//   priorityId?: number;
//   createTask?: CreateTypeTask;
// }

const initialState = {
  projectList: [],
  projectCategories: [],
  projectMembers: [],
  projectDetail: null,
  error: null,
  statusTask: null,
  taskType: null,
  priority: null,
  createTask: null,
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
    assignUserToProjectAction: (state, action) => {
      state.projectDetail = action.payload;
    },
    assignUserTaskAction: (state, action) => {
      state.projectDetail = action.payload;
    },
    removeUserFromTaskAction: (state, action) => {
      state.projectDetail = action.payload;
    },
    removeUserFromProjectAction: (state, action) => {
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
  assignUserToProjectAction,
  assignUserTaskAction,
  removeUserFromTaskAction,
  removeUserFromProjectAction,
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
    const result = await http.post(`/Project/createProjectAuthorize`, project);
    const action = createProjectAuthorizeAction(result.data.content);
    dispatch(action);
    notification.success({
      message: `Project created successfully`,
    });
  };
};

export const getProjectDetailApi = (projectId: number | string) => {
  return async (dispatch: DispatchType) => {
    const result = await http.get(`/Project/getProjectDetail?id=${projectId}`);
    const action = getProjectDetailAction(result.data.content);
    dispatch(action);
  };
};

export const updateProjectApi = (projectUpdate: ProjectEditModel) => {
  return async (dispatch: DispatchType) => {
    const result = await http.put(
      `/Project/updateProject?projectId=${projectUpdate.id}`
    );
    const action = updateProjectAction(result.data.content);
    dispatch(action);
    notification.success({
      message: `Project updated successfully`,
    });
  };
};

export const assignUserToProjectApi = (addUser: AddUserModel) => {
  return async (dispatch: DispatchType) => {
    const result = await http.post(`/Project/assignUserProject`, addUser);
    const action = assignUserToProjectAction(result.data.content);
    dispatch(action);
  };
};

export const assignUserTaskApi = (taskId: number, userId: number) => {
  return async (dispatch: DispatchType) => {
    const result = await http.post(`/Project/assignUserTask`, {
      taskId,
      userId,
    });
    const action = assignUserToProjectAction(result.data.content);
    dispatch(action);
  };
};

export const removeUserFromTaskApi = (taskId: number, userId: number) => {
  return async (dispatch: DispatchType) => {
    const result = await http.post("/Project/removeUserFromTask", {
      taskId,
      userId,
    });
    const action = removeUserFromTaskAction(result.data.content);
    dispatch(action);
  };
};

export const removeUserFromProjectApi = (projectId: number, userId: number) => {
  return async (dispatch: DispatchType) => {
    const result = await http.post("/Project/removeUserFromProject", {
      projectId,
      userId,
    });
    const action = removeUserFromProjectAction(result.data.content);
    dispatch(action);
  };
};
