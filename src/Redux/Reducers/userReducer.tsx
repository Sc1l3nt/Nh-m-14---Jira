import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, http } from "../../Utils/config";
import { DispatchType } from "../configStore";
import { history } from "../../index";
import { notification } from "antd";
import axios from "axios";

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
    registerAction: (state, action) => {
      state.userProfile = action.payload;
    },
    changeInfoAction: (state, action) => {
      state.userProfile = action.payload;
    },
    getAllUserAction: (state, action) => {
      state.arrayUser = action.payload;
    },
  },
});

export const {
  loginAction,
  registerAction,
  changeInfoAction,
  getAllUserAction,
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
    //const result = await http.get("/Users/getUser");
    const result = await axios({
      url: "https://jiranew.cybersoft.edu.vn/api/Users/getUser",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udGVuZCA3MyIsIkhldEhhblN0cmluZyI6IjE5LzA1LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NDQ1NDQwMDAwMCIsIm5iZiI6MTY1OTg5MTYwMCwiZXhwIjoxNjg0NjAyMDAwfQ.49m9-EoDr6zr7UOk_79hfcvJWKI_s0Wy_g40ossfl9c",
      },
    })
      .then((res) => {
        const action = getAllUserAction(res.data.content);
        dispatch(action);
      })
      .catch((err) => console.log(err));
  };
};
