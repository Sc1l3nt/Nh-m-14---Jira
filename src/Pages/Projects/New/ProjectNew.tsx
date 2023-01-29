import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../../Redux/configStore";
import {
  createProjectAuthorizeApi,
  getAllProjectCategoryApi,
  ProjectModel,
} from "../../../Redux/Reducers/projectReducer";
import { Editor } from "@tinymce/tinymce-react";
import AddMemberModal from "../../../Components/AddMemberModal/AddMemberModal";
import { Breadcrumb, Button, Form, Input, Select, Typography } from "antd";
import { Link } from "react-router-dom";

type Props = {};

const ProjectNew = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const { projectCategories, projectDetail, error } = useSelector(
    (state: RootState) => state.projectReducer
  );
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectName: "",
      description: "",
      categoryId: "",
    },
    validationSchema: yup.object().shape({
      projectName: yup.string().required("Project name is required"),
      categoryId: yup
        .number()
        .required("Project category is required")
        .min(1, "Project category is required")
        .max(3, "Project category is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      form.setTouched({
        projectName: true,
        categoryId: true,
      });

      const data = {
        ...values,
        categoryId: parseInt(values.categoryId),
      };

      if (!form.dirty) return;
      if (!form.isValid) return;
      dispatch(createProjectAuthorizeApi(data));
      setShowAddMemberModal(true);

      // const action = createProjectAPI(values);
      // dispatch(action);
    },
  });

  useEffect(() => {
    dispatch(getAllProjectCategoryApi());
  }, [dispatch]);

  useEffect(() => {
    if (error === "Project name already exists") {
      form.setErrors({
        projectName: error,
        ...form.errors,
      });
    }
  }, [error]);

  const handleCancel = () => {
    //dispatch(createAction(actionType.SET_PROJECT_DETAIL, null));
    setShowAddMemberModal(false);
  };
  return (
    <div style={{ maxWidth: 980 }} className="mx-auto">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/projects">Projects</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>New project</Breadcrumb.Item>
      </Breadcrumb>

      <div className="mb-4">
        <Typography.Title level={3}>New project</Typography.Title>
      </div>

      <Form layout="vertical" onFinish={form.handleSubmit}>
        <Form.Item
          label={
            <Typography.Text strong>
              Project name <span className="text-red-700">*</span>
            </Typography.Text>
          }
          help={form.touched.projectName && form.errors.projectName}
          validateStatus={
            form.touched.projectName && !!form.errors.projectName ? "error" : ""
          }
        >
          <Input
            name="projectName"
            value={form.values.projectName}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label={
            <Typography.Text strong>
              Project category <span className="text-red-700">*</span>
            </Typography.Text>
          }
          help={form.touched.categoryId && form.errors.categoryId}
          validateStatus={
            form.touched.categoryId && !!form.errors.categoryId ? "error" : ""
          }
        >
          <Select
            className="w-full"
            placeholder="Select a project category"
            // name="categoryId"
            value={form.values.categoryId}
            onChange={(value) => form.setFieldValue("categoryId", value)}
          >
            <Select.Option value={0}>Select a project category</Select.Option>
            {projectCategories.map(({ id, projectCategoryName }) => {
              return (
                <Select.Option key={id} value={id}>
                  {projectCategoryName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label={<Typography.Text strong>Descriptions</Typography.Text>}
          style={{ minHeight: 230 }}
        >
          <Editor
            // name="description"
            value={form.values.description}
            onEditorChange={(newValue) => {
              newValue = newValue.replace(/<[^>]*>/g, "");
              form.setFieldValue("description", newValue);
            }}
          />
        </Form.Item>

        <div className="flex">
          <Link
            to="/projects"
            className="flex justify-center items-center h-8 bg-gray-300 hover:bg-gray-400 focus:bg-blue-300 text-gray-700 hover:text-gray-700 focus:text-blue-700 border-0 mr-1 font-medium py-1.5 px-3 rounded"
          >
            Cancel
          </Link>

          <Button
            htmlType="submit"
            className="flex justify-center items-center h-8 bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 text-white hover:text-white focus:text-white font-medium py-1.5 px-3 rounded border-0"
          >
            Create
          </Button>
        </div>
      </Form>

      {projectDetail && (
        <AddMemberModal
          visible={showAddMemberModal}
          onCancel={handleCancel}
          project={projectDetail}
        />
      )}
    </div>
  );
};

export default ProjectNew;
