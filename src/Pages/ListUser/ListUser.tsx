import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Input,
  Modal,
  notification,
  Popconfirm,
  Space,
  Table,
  Typography,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../Redux/configStore";
import {
  deleteUserApi,
  getAllUserApi,
  UserModel,
} from "../../Redux/Reducers/userReducer";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface DataType {
  key: React.Key;
  name: string;
  userId: number;
  email: string;
  phoneNumber: string;
}

type Props = {};

const ListUser = (props: Props) => {
  const { arrayUser } = useSelector((state: RootState) => state.userReducer);
  const dispatch: DispatchType = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);

  // handle edit user
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passWord, setPassWord] = useState("");

  const data = {
    key: "1",
    name: "Mike",
    userId: 1,
    email: "mike@gmail.com",
    phoneNumber: "11111111",
    avatar: "meomeo",
  };

  var user: UserModel = selectedUser || data;

  const columns: ColumnsType<DataType> = [
    {
      title: "No.",
      dataIndex: "orderNumber",
      key: "orderNumber",
      width: "6%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      ellipsis: true,
      width: "12%",
      sorter: (a, b) => a.userId - b.userId,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="small">
          {/* edit button */}
          <Button
            className="bg-transparent hover:bg-transparent focus:bg-transparent text-blue-700 hover:text-blue-500 focus:text-blue-500 border-0 shadow-none"
            icon={<EditOutlined />}
            onClick={handleEditUser(record)}
          />

          {/* delete button*/}
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => {
              dispatch(deleteUserApi(record.userId));
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              className="bg-transparent hover:bg-transparent focus:bg-transparent text-red-600 hover:text-red-500 focus:text-red-500 border-0 shadow-none"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllUserApi());
  }, [dispatch]);

  const handleEditUser = (user: any) => () => {
    setSelectedUser(user);
    setShowEditUserModal(true);
  };

  console.log("re-render", user);

  const handleOk = () => {
    setShowEditUserModal(false);
    if (!passWord) {
      notification.warning({
        message: "Please enter password",
      });
    } else {
      const updatedData = {
        userId: user.userId,
        email: email || user.email,
        name: name || user.name,
        phoneNumber: phoneNumber || user.phoneNumber,
        passWord: passWord,
      };
      console.log(updatedData);
    }
  };

  const handleCancel = () => {
    setShowEditUserModal(false);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={arrayUser || undefined}
        style={{ width: "90vw" }}
      />
      <Modal
        title="Basic Modal"
        open={showEditUserModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Update"
      >
        <Typography.Text>Id</Typography.Text>
        <Input value={user.userId} id="id" disabled />
        <Typography.Text>Email</Typography.Text>
        <Input
          defaultValue={user.email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Typography.Text>Name</Typography.Text>
        <Input
          defaultValue={user.name}
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <Typography.Text>Phone</Typography.Text>
        <Input
          defaultValue={user.phoneNumber}
          id="phoneNumber"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Typography.Text>Password</Typography.Text>
        <Input
          defaultValue=""
          id="passWord"
          onChange={(e) => setPassWord(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default ListUser;
