import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Input,
  notification,
  Space,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../Redux/configStore";
import "./Profile.scss";
import { changeInfoApi } from "../../Redux/Reducers/userReducer";

type Props = {};

interface UserProfilePage {
  id: number;
  email: string;
  avatar: string;
  phoneNumber: string;
  name: string;
}

const Profile = (props: Props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passWord, setPassWord] = useState("");
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const dispatch: DispatchType = useDispatch();
  if (!userLogin) {
    alert("Please login");
    window.location.href = "http://localhost:3000/login";
    return null;
  }
  const user: UserProfilePage = userLogin;

  const handleUpdateUser = () => {
    if (passWord === "") {
      notification.warning({
        message: "Please enter your password",
      });
    } else {
      const dataChange = {
        id: user.id.toString(),
        email: email || user.email,
        phoneNumber: phoneNumber || user.phoneNumber,
        name: name || user.name,
        passWord: passWord,
      };
      const actionSync = changeInfoApi(dataChange);
      dispatch(actionSync);
    }
  };

  return (
    <div className="container" style={{ width: "100vw" }}>
      <div className="row my-2 w-50" style={{ margin: "0 auto" }}>
        <div className="col-5">
          <Card
            title="username"
            className="text-center"
            style={{ border: "1px solid #eee" }}
          >
            <Avatar
              size="large"
              src={user.avatar}
              style={{ width: "200px", height: "200px" }}
            />
          </Card>
        </div>
        <div className="col-7">
          <Card title="My Profile" style={{ width: "100%" }}>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <Typography.Text>Id</Typography.Text>
              <Input defaultValue={user.id} id="id" disabled />
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
                id="phoneNumber"
                onChange={(e) => setPassWord(e.target.value)}
              />
            </Space>
          </Card>
          <Button
            type="primary"
            className="mt-3"
            onClick={() => handleUpdateUser()}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
