import { PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Modal,
  Row,
  Select,
  Tooltip,
  Typography,
} from "antd";
import { useFormik } from "formik";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AddMemberModal from "../../Components/AddMemberModal/AddMemberModal";
import { DispatchType, RootState } from "../../Redux/configStore";
import {
  getProjectDetailApi,
  MemberModel,
  ProjectModel,
} from "../../Redux/Reducers/projectReducer";
import {
  getAllTaskTypesApi,
  updateTaskStatusApi,
} from "../../Redux/Reducers/taskReducer";
import PageNotFound from "../PageNotFound/PageNotFound";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskListTitle from "../../Components/Tasks/TaskListTitle/TaskListTitle";

type Props = {};

const Tasks = (props: Props) => {
  const params = useParams();
  const projectId = params.projectId || 0;
  const dispatch: DispatchType = useDispatch();
  const { projectDetail, error } = useSelector(
    (state: RootState) => state.projectReducer
  );
  const projectDetailData: ProjectModel = projectDetail || {
    members: [],
    creator: { id: 2417, name: "Admin Cyberlearn - 01" },
    id: 10679,
    projectName: "test",
    description: "123",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "test",
    deleted: false,
  };
  const { taskTypes, taskError } = useSelector(
    (state: RootState) => state.taskReducer
  );
  const [clonedProjectDetail, setClonedProjectDetail] = useState(null);
  const [showNewTaskTextarea, setShowNewTaskTextarea] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const newTaskRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: "1",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: projectId,
      typeId: 1,
      priorityId: 2,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  useEffect(() => {
    dispatch(getProjectDetailApi(projectId));
    dispatch(getAllTaskTypesApi());

    // return () => {
    //   dispatch(createAction(actionType.SET_PROJECT_DETAIL, null));
    //   dispatch(createAction(actionType.SET_TASK_ERROR, null));
    // };
  }, [dispatch, projectId]);

  useEffect(() => {
    if (projectDetail) {
      setClonedProjectDetail({ ...projectDetail });
    }
  }, [projectDetail]);

  useEffect(() => {
    if (taskError === "Task already exists!") {
      formik.setErrors({
        taskName: taskError,
        ...formik.errors,
      });
    }

    if (taskError === "User is unthorization!") {
      Modal.warning({
        title: taskError,
        content: "You are not the owner of this project",
        okText: "OK",
        okButtonProps: {
          className:
            "bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 text-white font-semibold hover:text-white focus:text-white border-blue-700 hover:border-blue-600 focus:border-blue-700 rounded",
        },
        zIndex: 1050,
        style: { top: 80 },
        maskClosable: true,
        afterClose: () => {
          //dispatch(createAction(actionType.SET_TASK_ERROR, null));
          formik.resetForm();
        },
      });
    }
    // eslint-disable-next-line
  }, [taskError]);

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    const clonedProject = { ...projectDetail };

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const draggedItem = {
      ...clonedProject.lstTask[source.droppableId - 1].lstTaskDeTail[
        source.index
      ],
    };

    clonedProject.lstTask[source.droppableId - 1].lstTaskDeTail.splice(
      source.index,
      1
    );

    clonedProject.lstTask[destination.droppableId - 1].lstTaskDeTail.splice(
      destination.index,
      0,
      draggedItem
    );

    setClonedProjectDetail(clonedProject);

    // dispatch(
    //   updateTaskStatusApi(
    //     {
    //       taskId: draggableId,
    //       statusId: destination.droppableId,
    //     },
    //     () => dispatch(getProjectDetailApi(projectId))
    //   )
    // );
    dispatch(updateTaskStatusApi(draggableId, destination.droppableId));
    dispatch(getProjectDetailApi(projectId));
  };

  const handleKeyDownOnNewTaskTextarea = (e: any) => {
    // keyCode = 27 <=> press ESC button
    if (e.keyCode === 27) {
      setShowNewTaskTextarea(false);
    }

    // keyCode = 13 <=> press ENTER button
    if (e.keyCode === 13) {
      e.preventDefault();

      if (!formik.values.taskName.trim().length) {
        return;
      }

      // dispatch(
      //   createTask(formik.values, () => {
      //     formik.resetForm();
      //     dispatch(fetchProjectDetail(projectId));
      //   })
      // );
      dispatch(getProjectDetailApi(projectId));
    }
  };

  const handleBlurNewTaskTextarea = () => {
    setShowNewTaskTextarea(false);
  };

  const handleTaskTypeClick = () => {
    setShowNewTaskTextarea(true);
  };

  const handleTaskTypeDropdownVisibleChange = (open: any) => {
    if (!open) {
      newTaskRef.current?.focus();
    }
  };

  const handleClickTaskItem = (taskItem: any) => () => {
    setSelectedTask(taskItem);
    setShowEditTaskModal(true);
  };

  const handleCancelEditTask = () => {
    setSelectedTask(null);
    setShowEditTaskModal(false);
  };

  const handleCancelUpdateMembers = () => {
    setShowAddMembersModal(false);
  };

  const handleFetchProject = () => {
    dispatch(getProjectDetailApi(projectId));
  };

  // check if the project no longers exist
  if (error && error === "Project is not found") {
    return <PageNotFound />;
  }

  return (
    <div>
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/projects">Projects</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{projectDetail?.projectName}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mb-4">
        <Col xs={{ span: 24 }} md={{ span: 6 }}>
          <Typography.Title level={3}>Board</Typography.Title>
        </Col>

        <Col xs={{ span: 24 }} md={{ span: 18 }}>
          {!!projectDetail?.members.length && (
            <Typography.Text strong className="mr-4">
              Members
            </Typography.Text>
          )}

          {projectDetail?.members.map((member: MemberModel) => {
            return (
              <Tooltip key={member.userId} title={member.name} placement="top">
                <Avatar
                  src={member.avatar}
                  alt={member.name}
                  className="mr-1"
                />
              </Tooltip>
            );
          })}

          {!projectDetail?.members.length && (
            <Typography.Text strong className="mr-4">
              Add members
            </Typography.Text>
          )}

          <Button
            shape="circle"
            icon={<PlusOutlined />}
            className="hover:border-blue-600 focus:border-blue-600 hover:text-blue-600 focus:text-blue-600"
            onClick={() => setShowAddMembersModal(true)}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <DragDropContext onDragEnd={handleDragEnd}>
          {clonedProjectDetail?.lstTask?.map((listTaskItem) => {
            return (
              <Col
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                lg={{ span: 6 }}
                key={listTaskItem.statusId}
                className="mb-4"
              >
                <div className="bg-gray-100 w-full h-full p-2 rounded flex flex-col">
                  <TaskListTitle title={listTaskItem.statusName} />

                  <Droppable droppableId={listTaskItem.statusId}>
                    {(provided) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="flex-grow"
                        >
                          {listTaskItem.lstTaskDeTail.map(
                            (listTaskDetailItem, index) => {
                              return (
                                <TaskItem
                                  key={listTaskDetailItem.taskId}
                                  listTaskDetailItem={listTaskDetailItem}
                                  index={index}
                                  onClick={handleClickTaskItem(
                                    listTaskDetailItem
                                  )}
                                />
                              );
                            }
                          )}

                          {provided.placeholder}

                          {listTaskItem.statusName === "BACKLOG" && (
                            <>
                              {!showNewTaskTextarea && (
                                <button
                                  onClick={() => setShowNewTaskTextarea(true)}
                                  className="h-8 hover:bg-gray-300 focus:bg-gray-300 w-full text-left font-medium mt-1 py-1 px-3 rounded duration-300"
                                >
                                  <PlusOutlined className="mr-1" />
                                  <span>Create</span>
                                </button>
                              )}
                              {showNewTaskTextarea && (
                                <>
                                  <div
                                    className={`bg-white border-2 mt-1 rounded${
                                      formik.errors.taskName
                                        ? " border-red-500 focus:border-red-500"
                                        : " border-blue-400 focus:border-blue-400"
                                    }`}
                                  >
                                    <textarea
                                      rows="2"
                                      maxLength="255"
                                      placeholder="What needs to be done?"
                                      className="w-full pt-2 px-2 outline-none resize-none"
                                      onKeyDown={handleKeyDownOnNewTaskTextarea}
                                      autoFocus
                                      name="taskName"
                                      value={formik.values.taskName}
                                      onChange={formik.handleChange}
                                      onBlur={handleBlurNewTaskTextarea}
                                      ref={newTaskRef}
                                    ></textarea>

                                    <Select
                                      name="typeId"
                                      value={formik.values.typeId}
                                      onChange={(value) =>
                                        formik.setFieldValue("typeId", value)
                                      }
                                      onClick={handleTaskTypeClick}
                                      onDropdownVisibleChange={
                                        handleTaskTypeDropdownVisibleChange
                                      }
                                      defaultValue={1}
                                      bordered={false}
                                      className="mb-1"
                                      optionLabelProp="label"
                                      dropdownMatchSelectWidth={false}
                                      style={{ marginTop: "-8px" }}
                                    >
                                      {taskTypes.map((type) => {
                                        return (
                                          <Select.Option
                                            key={type.id}
                                            value={type.id}
                                            label={
                                              <div className="h-full flex items-center">
                                                <Tooltip
                                                  title={
                                                    type.taskType
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                    type.taskType.slice(1)
                                                  }
                                                  placement="bottom"
                                                >
                                                  {type.id === 1 && <BugIcon />}
                                                  {type.id === 2 && (
                                                    <NewTaskIcon />
                                                  )}
                                                </Tooltip>
                                              </div>
                                            }
                                          >
                                            <div className="flex justify-start items-center">
                                              {type.id === 1 && (
                                                <BugIcon className="mr-1" />
                                              )}
                                              {type.id === 2 && (
                                                <NewTaskIcon className="mr-1" />
                                              )}
                                              <span>
                                                {type.taskType
                                                  .charAt(0)
                                                  .toUpperCase() +
                                                  type.taskType.slice(1)}
                                              </span>
                                            </div>
                                          </Select.Option>
                                        );
                                      })}
                                    </Select>
                                  </div>
                                  {formik.errors.taskName && (
                                    <div className="text-red-500">
                                      {formik.errors.taskName}
                                    </div>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </Col>
            );
          })}
        </DragDropContext>
      </Row>

      {/* {selectedTask && (
        <EditTaskModal
          visible={showEditTaskModal}
          onCancel={handleCancelEditTask}
          task={selectedTask}
        />
      )} */}

      {projectDetail && (
        <AddMemberModal
          visible={showAddMembersModal}
          onCancel={handleCancelUpdateMembers}
          project={projectDetail}
          onFetchProject={handleFetchProject}
          showFooter={false}
        />
      )}
    </div>
  );
};

export default Tasks;
