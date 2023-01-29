import { SearchOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  List,
  Modal,
  Row,
  Typography,
} from "antd";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../Redux/configStore";
import { MemberModel } from "../../Redux/Reducers/projectReducer";
import {
  getAllUserApi,
  getUserByProjectIdApi,
  UserModel,
} from "../../Redux/Reducers/userReducer";
import { history } from "../../index";

type Props = {
  visible: boolean;
  onCancel: any;
  project: any;
};

const AddMemberModal = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const { projectMembers, projectDetail, error } = useSelector(
    (state: RootState) => state.projectReducer
  );
  const { arrayUser } = useSelector((state: RootState) => state.userReducer);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const usersRef = useRef(null);
  const searchRef = useRef(null);
  const { visible, onCancel, project } = props;

  useEffect(() => {
    dispatch(getUserByProjectIdApi(project.projectId));
    dispatch(getAllUserApi());
  }, [dispatch, project.projectId]);

  useEffect(() => {
    const clonedUsers = [...(arrayUser || [])];
    // remove members from user list
    for (const member of projectMembers) {
      const index = clonedUsers.findIndex((item: UserModel) => {
        return item.userId === member.userId;
      });
      clonedUsers.splice(index, 1);
    }
    usersRef.current = [...clonedUsers];

    if (!searchRef.current) {
      setFilteredUsers([...clonedUsers]);
    } else {
      handleSearchUsers();
    }
  }, [projectMembers, arrayUser]);

  useEffect(() => {
    if (error === "User is unthorization!") {
      Modal.warning({
        title: error,
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
          // setError cái quần què gì đó
          //dispatch(createAction(actionType.SET_PROJECT_ERROR, null));
        },
      });
    }
  }, [error, dispatch]);

  const addMemberToProject = (userId: number) => () => {
    const data = { projectId: props.project.id, userId };
    dispatch(
      assignUserToProject(data, () => {
        dispatch(fetchUsersByProject(props.project.id));

        if (props.onFetchProject) {
          props.onFetchProject();
        }
      })
    );
  };

  const removeMemberFromProject = (userId) => () => {
    const data = { projectId: props.project.id, userId };
    dispatch(
      removeUserFromProject(data, () => {
        dispatch(fetchUsersByProject(props.project.id));

        if (props.onFetchProject) {
          props.onFetchProject();
        }
      })
    );
  };

  const handleGoToProjectsButtonClick = () => {
    props.onCancel();
    history.push("/projects");
  };

  const handleSearchUsers = (e: any) => {
    const value = searchRef.current?.input.value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const clonedUsers = [...usersRef.current];

    let foundUsers = [];

    for (const i in clonedUsers) {
      if (
        clonedUsers[i].name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(value)
      ) {
        foundUsers.push(clonedUsers[i]);
      }
    }

    setFilteredUsers([...foundUsers]);
  };

  return (
    <>
      <Modal
        title={
          <Typography.Title level={4} className="pl-6">
            Add members to project{" "}
            <span className="text-blue-700">{props.project.projectName}</span>
          </Typography.Title>
        }
        visible={props.visible}
        maskStyle={{ zIndex: 1050 }}
        wrapClassName="z-modal"
        className="z-modal"
        centered
        width={980}
        onCancel={props.onCancel}
        maskClosable={false}
        destroyOnClose={true}
        footer={
          true
            ? [
                <Button
                  key="projects"
                  onClick={handleGoToProjectsButtonClick}
                  className="h-8 bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 text-white hover:text-white focus:text-white font-medium py-1.5 px-3 rounded border-0"
                >
                  Go to projects
                </Button>,
                <Button
                  key="newProject"
                  onClick={props.onCancel}
                  className="h-8 bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 text-white hover:text-white focus:text-white font-medium py-1.5 px-3 rounded border-0"
                >
                  Create new project
                </Button>,
              ]
            : null
        }
      >
        <Row gutter={36}>
          <Col span={24}>
            <Form>
              <Form.Item
                label={<Typography.Text strong>Search users</Typography.Text>}
                colon={false}
                className="pl-6 pr-6"
                labelCol={{ span: 6 }}
                labelAlign="left"
              >
                <Input
                  allowClear
                  suffix={<SearchOutlined />}
                  className="w-48 rounded"
                  onChange={handleSearchUsers}
                  ref={searchRef}
                />
              </Form.Item>
            </Form>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Typography.Title level={5} className="pl-6">
              Not yet added
            </Typography.Title>
            <List
              className="mb-6"
              style={{
                height: 350,
                overflow: "auto",
                padding: "8px 24px",
              }}
              itemLayout="horizontal"
              dataSource={filteredUsers}
              renderItem={(item: UserModel) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={
                      <div className="text-xs">User ID: {item.userId}</div>
                    }
                  />
                  <div>
                    <Button
                      onClick={addMemberToProject(item.userId)}
                      className="flex justify-center items-center h-8 bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 text-white hover:text-white focus:text-white font-medium py-1.5 px-3 rounded border-0"
                    >
                      Add
                    </Button>
                  </div>
                </List.Item>
              )}
            />
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Typography.Title level={5} className="pl-6">
              Already in project
            </Typography.Title>
            <List
              className="mb-6"
              style={{
                height: 350,
                overflow: "auto",
                padding: "8px 24px",
              }}
              itemLayout="horizontal"
              dataSource={projectMembers}
              renderItem={(item: UserModel) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={
                      <div className="text-xs">User ID: {item.userId}</div>
                    }
                  />
                  <div>
                    <Button
                      onClick={removeMemberFromProject(item.userId)}
                      className="flex justify-center items-center h-8 bg-red-700 hover:bg-red-600 focus:bg-red-600 text-white hover:text-white focus:text-white font-medium py-1.5 px-3 rounded border-0"
                    >
                      Remove
                    </Button>
                  </div>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default AddMemberModal;
