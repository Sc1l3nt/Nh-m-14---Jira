import React from "react";
import { Avatar, Button, Card, Input, Space, Typography } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/configStore";
import { Navigate } from "react-router-dom";

type Props = {};

interface UserProfilePage {
  email: string;
  avatar: string;
  phoneNumber: string;
  name: string;
}

const Profile = (props: Props) => {
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  if (!userLogin) {
    alert("Please login");
    window.location.href = "http://localhost:3000/login";
    return null;
  }
  const user: UserProfilePage = userLogin;

  return (
    <div className="container" style={{ width: "100vw" }}>
      <div className="row my-2 w-50" style={{ margin: "0 auto" }}>
        <div className="col-5">
          <Card title="username" className="text-center">
            <Avatar size="large" src={user.avatar} />
            <ul className="text-start mt-3">
              <li>Change Password</li>
              <li>Logout</li>
              <li>Do something else</li>
            </ul>
          </Card>
        </div>
        <div className="col-7">
          <Card title="My Profile">
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <Typography.Text>Name</Typography.Text>
              <Input defaultValue={user.name} />
              <Typography.Text>Email</Typography.Text>
              <Input defaultValue={user.email} />
              <Typography.Text>Phone</Typography.Text>
              <Input defaultValue={user.phoneNumber} />
            </Space>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
