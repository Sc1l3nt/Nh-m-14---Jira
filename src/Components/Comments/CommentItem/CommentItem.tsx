import React, { useState, useEffect } from "react";
import { Comment, Avatar, Form, Typography, Button, Modal } from "antd";
import { DispatchType, RootState } from "../../../Redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  setCommentErrorAction,
  updateCommentApi,
} from "../../../Redux/Reducers/commentReducer";
import { getTaskDetailApi } from "../../../Redux/Reducers/taskReducer";

type Props = {
  taskId: number | any;
  comment: string | any;
};

const CommentItem = (props: Props) => {
  const { taskId, comment } = props;
  const { avatar, commentContent: contentComment, id, name } = comment;
  const dispatch: DispatchType = useDispatch();
  const { commentError } = useSelector(
    (state: RootState) => state.commentReducer
  );
  const [showEditCommentInput, setShowEditCommentInput] = useState(false);
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const formik = useFormik({
    initialValues: {
      id,
      contentComment,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  useEffect(() => {
    if (commentError === "403 Forbidden !") {
      Modal.warning({
        title: "Opps! Something went wrong",
        content: "You are not authorized",
        okText: "OK",
        okButtonProps: {
          className:
            "bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 text-white font-semibold hover:text-white focus:text-white border-blue-700 hover:border-blue-600 focus:border-blue-700 rounded",
        },
        zIndex: 1050,
        style: { top: 80 },
        maskClosable: true,
        afterClose: () => {
          dispatch(setCommentErrorAction(null));
        },
      });
    }
  }, [commentError, dispatch]);
  const actions = [
    <Button
      type="link"
      key="edit-comment"
      className="px-0 font-medium hover mr-2"
      onClick={() => setShowEditCommentInput(true)}
    >
      <span className="hover:underline text-gray-500 hover:text-gray-400">
        Edit
      </span>
    </Button>,
    <Button
      type="link"
      key="delete-comment"
      className="px-0 font-medium hover"
      onClick={() => setShowDeleteCommentModal(true)}
    >
      <span className="hover:underline text-gray-500 hover:text-gray-400">
        Delete
      </span>
    </Button>,
  ];

  const handleCancelEditComment = () => {
    formik.resetForm();
    setShowEditCommentInput(false);
  };

  const handleUpdateComment = async () => {
    // hide input field and prevent submiting form when there is no change
    if (!formik.dirty) {
      setShowEditCommentInput(false);
      return;
    }

    // prevent update comment with blank
    if (!formik.values.contentComment.length) return;

    // dispatch(
    //   updateCommentApi(formik.values.id, formik.values.contentComment, () => {
    //     dispatch(
    //       getTaskDetailApil(taskId, () => setShowEditCommentInput(false))
    //     );
    //   })
    // );
    try {
      await dispatch(
        updateCommentApi(formik.values.id, formik.values.contentComment)
      );
      await dispatch(getTaskDetailApi(taskId));
    } catch (error) {
      console.log(error);
    }
  };
  return <div>CommentItem</div>;
};

export default CommentItem;
