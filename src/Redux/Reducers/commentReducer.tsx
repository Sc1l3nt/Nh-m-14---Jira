import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../Utils/config";
import { DispatchType } from "../configStore";

const initialState = {
  commentError: null,
  commentList: [],
};

const commentReducer = createSlice({
  name: "commentReducer",
  initialState,
  reducers: {
    setCommentErrorAction: (state, action) => {
      state.commentError = action.payload;
    },
    getAllCommentsAction: (state, action) => {
      state.commentList = action.payload;
    },
    insertCommentAction: (state: any, action: any) => {
      state.commentList.push(action.payload);
    },
    updateCommentAction: (state: any, action: any) => {
      state.commentList = action.payload;
    },
    deleteCommentAction: (state: any, action: any) => {
      state.commentList = action.payload;
    },
  },
});

export const { setCommentErrorAction } = commentReducer.actions;

export default commentReducer.reducer;

export const getAllCommentsApi = (params: any) => {
  return async (dispatch: DispatchType) => {
    const result = await http.get("/Comment/getAll", { params });
  };
};

export const insertCommentApi = (taskId: number, contentComment: string) => {
  return async (dispatch: DispatchType) => {
    const result = await http.post("/Comment/insertComment", {
      taskId,
      contentComment,
    });
  };
};

export const updateCommentApi = (id: number, contentComment: string) => {
  return async (dispatch: DispatchType) => {
    const result = await http.put(
      `/Comment/updateComment?id=${id}&contentComment=${contentComment}`
    );
  };
};

export const deleteCommentApi = (idComment: number) => {
  return async (dispatch: DispatchType) => {
    const result = await http.delete(
      `/Comment/deleteComment?idComment=${idComment}`
    );
  };
};
