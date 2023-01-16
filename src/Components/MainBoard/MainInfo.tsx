import React, { useState } from "react";
import { Typography, Input, Button, Avatar, Divider, Tooltip } from "antd";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
const { Search } = Input;

type Props = {};

const MainInfo = (props: Props) => {
  const UserList = ["U", "Lucy", "Tom", "Edward"];
  const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
  const GapList = [4, 3, 2, 1];

  // get value when searching
  const onSearch = (value: string) => console.log(value);

  // array avatar of user list
  const [user, setUser] = useState(UserList[0]);
  const [color, setColor] = useState(ColorList[0]);
  const [gap, setGap] = useState(GapList[0]);

  const changeUser = () => {
    const index = UserList.indexOf(user);
    setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
    setColor(
      index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]
    );
  };

  const changeGap = () => {
    const index = GapList.indexOf(gap);
    setGap(index < GapList.length - 1 ? GapList[index + 1] : GapList[0]);
  };

  return (
    <>
      <Typography.Title>Cyber Board</Typography.Title>
      <div className="info" style={{ display: "flex" }}>
        <div className="search-block">
          {/* <input className="search" />
          <i className="fa fa-search" /> */}
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          <Avatar.Group
            maxCount={3}
            maxPopoverTrigger="click"
            size="large"
            maxStyle={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
              cursor: "pointer",
            }}
          >
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <Avatar style={{ backgroundColor: "#f56a00" }}>baobao</Avatar>
            <Tooltip title="Ant User" placement="top">
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
            </Tooltip>
            <Avatar
              style={{ backgroundColor: "#1890ff" }}
              icon={<AntDesignOutlined />}
            />
          </Avatar.Group>
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div>
      </div>
    </>
  );
};

export default MainInfo;
