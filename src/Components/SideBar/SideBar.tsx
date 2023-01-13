import { BarsOutlined } from "@ant-design/icons";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons/lib/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";

type Props = {};

const SideBar = (props: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={isCollapsed}
      style={{ height: "100%" }}
    >
      <div
        className="text-right pr-2"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <BarsOutlined
          style={{ cursor: "pointer", color: "#fff", fontSize: 25 }}
        />
      </div>

      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item
          key="1"
          icon={<PlusOutlined style={{ fontSize: 20 }} />}
          onClick={() => {
            // dispatch({
            //   type: "OPEN_FORM_CREATE_TASK",
            //   Component: <FormCreateTask />,
            //   title: "Create task",
            // });
          }}
        >
          <span className="mb-2">Create task</span>
        </Menu.Item>
        <Menu.Item key="2" icon={<SearchOutlined style={{ fontSize: 20 }} />}>
          Search
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
