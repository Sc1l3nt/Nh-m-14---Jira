import { useFormik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../../Redux/configStore";
import {
  getAllProjectCategoryApi,
  getProjectDetailApi,
  ProjectModel,
  updateProjectApi,
} from "../../../Redux/Reducers/projectReducer";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import PageNotFound from "../../PageNotFound/PageNotFound";
import { Breadcrumb, Button, Form, Input, Select, Typography } from "antd";
import { Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

type Props = {};

const ProjectEdit = (props: Props) => {
  const params = useParams();
  const projectId = params.id || 1;
  const dispatch: DispatchType = useDispatch();
  const { projectDetail, projectCategories, error } = useSelector(
    (state: RootState) => state.projectReducer
  );

  const [projectName, setProjectName] = useState("");
  const [projectCategory, setProjectCategory] = useState(0);
  const [projectDescription, setProjectDescription] = useState("");

  const projectItemDetail: any = projectDetail;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectName: "",
      description: "",
      id: 0,
      creator: 0,
      categoryId: "",
    },
    validationSchema: yup.object().shape({
      //projectName: yup.string().required("Project name is required"),
      categoryId: yup
        .number()
        .required("Project category is required")
        .min(1, "Project category is required")
        .max(3, "Project category is required"),
    }),
    onSubmit: (values) => {
      console.log("onSubmit", values);
    },
  });

  useEffect(() => {
    dispatch(getAllProjectCategoryApi());
    dispatch(getProjectDetailApi(projectId));
  }, [dispatch, projectId]);

  // useEffect(() => {
  //   formik.setValues({
  //     ...projectDetail,
  //     creator: projectDetail?.creator.id,
  //     categoryId: projectDetail?.projectCategory.id,
  //   });

  //   // eslint-disable-next-line
  // }, [projectDetail]);

  const handleUpdateProject = () => {
    formik.setTouched({
      projectName: true,
      categoryId: true,
    });

    if (!formik.dirty) return;

    if (!formik.isValid) return;

    // dispatch(
    //   updateProjectApi(formik.values, () => {
    //     dispatch(getProjectDetailApi(projectId));
    //     Swal.fire({
    //       title: "Project updated successfully",
    //       icon: "success",
    //       showConfirmButton: false,
    //     });
    //   })
    // );
    console.log("formik.values", formik.values);
    const updatedData = {
      id: projectId,
      projectName: projectName || formik.values.projectName,
      description: projectDescription || formik.values.description,
      categoryId: formik.values.categoryId,
    };
    dispatch(updateProjectApi(updatedData));
    dispatch(getProjectDetailApi(projectId));
    Swal.fire({
      title: "Project updated successfully",
      icon: "success",
      showConfirmButton: false,
    });
  };

  // check if the project no longers exist
  if (error && error === "Project is not found") {
    return <PageNotFound />;
  }

  return (
    <div style={{ maxWidth: 980 }} className="mx-auto">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/projects">Projects</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/projects/${projectId}/board`}>
            {projectItemDetail?.projectName}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Project settings</Breadcrumb.Item>
      </Breadcrumb>

      <div className="mb-4">
        <Typography.Title level={3}>Update project</Typography.Title>
      </div>

      <Form layout="vertical" onFinish={handleUpdateProject}>
        <Form.Item
          label={
            <Typography.Text strong>
              Project ID <span className="text-red-700">*</span>
            </Typography.Text>
          }
        >
          <Input disabled value={projectItemDetail?.id} />
        </Form.Item>
        <Form.Item
          label={
            <Typography.Text strong>
              Project name <span className="text-red-700">*</span>
            </Typography.Text>
          }
          help={formik.touched.projectName && formik.errors.projectName}
          validateStatus={
            formik.touched.projectName && !!formik.errors.projectName
              ? "error"
              : ""
          }
        >
          <Input
            name="projectName"
            value={projectName || projectItemDetail?.projectName}
            // onChange={formik.handleChange}
            onChange={(e) => setProjectName(e.target.value)}
            // onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label={
            <Typography.Text strong>
              Project category <span className="text-red-700">*</span>
            </Typography.Text>
          }
          help={formik.touched.categoryId && formik.errors.categoryId}
          validateStatus={
            formik.touched.categoryId && !!formik.errors.categoryId
              ? "error"
              : ""
          }
        >
          <Select
            className="w-full"
            placeholder="Select a project category"
            // name="categoryId"
            value={projectItemDetail?.categoryId}
            onChange={(value) => formik.setFieldValue("categoryId", value)}
          >
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
          label={<Typography.Text strong>Description</Typography.Text>}
          style={{ minHeight: 230 }}
        >
          <Editor
            // name="description"
            value={projectDescription || projectItemDetail?.description}
            onEditorChange={(value) => {
              value = value.replace(/<[^>]*>/g, "");
              formik.setFieldValue("description", value);
              setProjectDescription(value);
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
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProjectEdit;
