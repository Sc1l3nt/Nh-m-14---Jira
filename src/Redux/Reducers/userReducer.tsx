import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../Utils/config";
import { DispatchType } from "../configStore";
import { history } from "../../index";

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

const initialState = {
  userLogin: null,
  userProfile: null,
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
  },
});

export const { loginAction, registerAction } = UserReducer.actions;

export default UserReducer.reducer;

export const loginApi = (userLogin: UserLoginModel) => {
  return async (dispatch: DispatchType) => {
    const result = await http.post("/Users/signin", userLogin);
    const action = loginAction(result.data.content);
    dispatch(action);
    localStorage.setItem("user_login", JSON.stringify(result.data.content));
    localStorage.setItem(
      "access_token",
      JSON.stringify(result.data.content.accessToken)
    );
    // login successfully, redirect to profile page
    history.push("/profile");
  };
};

export const registerApi = (userRegister: UserRegisterModel) => {
  return async (dispatch: DispatchType) => {
    const result = await http.post("/Users/signup", userRegister);
    const action = registerAction(result.data.content);
    dispatch(action);
    history.push("/login");
  };
};
