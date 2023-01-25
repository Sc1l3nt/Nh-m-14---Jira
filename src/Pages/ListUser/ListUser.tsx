import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../Redux/configStore";
import {
  deleteUserApi,
  getAllUserApi,
  UserModel,
} from "../../Redux/Reducers/userReducer";
import {
  DeleteFilled,
  DeleteOutlined,
  EditOutlined,
  EditTwoTone,
} from "@ant-design/icons";

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
  const [state, setState] = useState({ filteredInfo: null, sortedInfo: null });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);

  const data = [
    {
      key: "1",
      name: "John",
      userId: 112,
      email: "john@example.com",
      phoneNumber: "0123456789",
    },
  ];
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

  const handleCancelEditUser = () => {
    setShowEditUserModal(false);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={arrayUser || undefined}
        style={{ width: "90vw" }}
      />
    </>
  );
};

export default ListUser;
