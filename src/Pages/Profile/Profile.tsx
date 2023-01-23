import React from "react";
import { Avatar, Button, Card, Input, Space, Typography } from "antd";

type Props = {};

const Profile = (props: Props) => {
  const onClick = () => console.log("something clicked");
  return (
    <div className="container" style={{ width: "100vw" }}>
      <div className="row my-2 w-50" style={{ margin: "0 auto" }}>
        <div className="col-5">
          <Card title="username" className="text-center">
            <Avatar size="large" />
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
              <Input defaultValue="nameAAAAA" />
              <Typography.Text>Email</Typography.Text>
              <Input defaultValue="nameAAAAA@gmail.com" />
              <Typography.Text>Phone</Typography.Text>
              <Input defaultValue="nameAAAAA" />
              <Typography.Text>Address</Typography.Text>
              <Input defaultValue="nameAAAAA" />
            </Space>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
