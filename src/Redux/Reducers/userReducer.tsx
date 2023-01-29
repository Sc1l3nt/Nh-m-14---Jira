import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../Utils/config";
import { DispatchType } from "../configStore";
import { history } from "../../index";
import { notification } from "antd";

export interface UserLoginModel {
  email: string;
  passWord: string;
}

export interface UserRegisterModel {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

export interface UserChangeInfoModel {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  passWord: string;
}

export interface UserModel {
  userId: number;
  name: string;
  avatar: string;
  email: string;
  phoneNumber: string;
}

export interface AddUserModel {
  userId: number;
  projectId: number;
}

// export interface UserState {
//   userLogin: UserLoginResult;
//   user: USER[];
//   addUser: AddUser;
//   ModalOpen: boolean;
//   userByProjectId: UserByProjectId[];
//   userRegister: RegisterModel;
// }

const initialState = {
  userLogin: null,
  userProfile: null,
  arrayUser: null,
};

const UserReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.userLogin = action.payload;
    },
    loginFacebookAction: (state, action) => {
      state.userLogin = action.payload;
    },
    registerAction: (state, action) => {
      state.userProfile = action.payload;
    },
    changeInfoAction: (state, action) => {
      state.userProfile = action.payload;
    },
    getAllUserAction: (state, action) => {
      state.arrayUser = action.payload;
    },
    deleteUserAction: (state, action) => {
      state.arrayUser = action.payload;
    },
    getUserByProjectIdAction: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const {
  loginAction,
  registerAction,
  changeInfoAction,
  getAllUserAction,
  deleteUserAction,
  getUserByProjectIdAction,
  loginFacebookAction,
} = UserReducer.actions;

export default UserReducer.reducer;

export const loginApi = (userLogin: UserLoginModel) => {
  return async (dispatch: DispatchType) => {
    const result = await http.post("/Users/signin", userLogin);
    const action = loginAction(result.data.content);
    dispatch(action);
    localStorage.setItem("user_login", JSON.stringify(result.data.content));
    localStorage.setItem("access_token", result.data.content.accessToken);
    notification.success({
      message: "Login successfully",
    });
    //login successfully, redirect to profile page
    history.push("/profile");
  };
};

export const loginFacebookApi = (facebookToken: string) => {
  return async (dispatch: DispatchType) => {
    const result = await http.post("/Users/facebooklogin", facebookToken);
    const action = loginAction(result.data.content);
    dispatch(action);
    localStorage.setItem("user_login", JSON.stringify(result.data.content));
    localStorage.setItem("access_token", result.data.content.accessToken);
    notification.success({
      message: "Login successfully",
    });
    //login successfully, redirect to profile page
    history.push("/profile");
  };
};

export const registerApi = (userRegister: UserRegisterModel) => {
  return async (dispatch: DispatchType) => {
    const result = await http.post("/Users/signup", userRegister);
    const action = registerAction(result.data.content);
    dispatch(action);
    notification.success({
      message: "Register successfully",
    });
    history.push("/login");
  };
};

export const changeInfoApi = (userChangeInfo: UserChangeInfoModel) => {
  return async (dispatch: DispatchType) => {
    const result = await http.put("/Users/editUser", userChangeInfo);
    const action = changeInfoAction(result.data.content);
    dispatch(action);
    notification.success({
      message: "Change information successfully",
    });
  };
};

export const getAllUserApi = () => {
  return async (dispatch: DispatchType) => {
    const result = await http.get("/Users/getUser");
    const action = getAllUserAction(result.data.content);
    dispatch(action);
  };
};

export const deleteUserApi = (userId: number) => {
  return async (dispatch: DispatchType) => {
    const result = await http.delete(`/Users/deleteUser?id=${userId}`);
    const action = deleteUserAction(result.data.content);
    dispatch(action);
    notification.success({
      message: "Deleted user successfully",
    });
    dispatch(getAllUserApi());
    window.location.reload();
  };
};

export const getUserByProjectIdApi = (projectId: number) => {
  return async (dispatch: DispatchType) => {
    const result = await http.get(
      `Users/getUserByProjectId?idProject=${projectId}`
    );
    const action = getUserByProjectIdAction(result.data.content);
    dispatch(action);
  };
};
