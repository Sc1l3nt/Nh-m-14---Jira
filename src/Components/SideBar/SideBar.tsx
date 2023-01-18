import { BarsOutlined } from "@ant-design/icons";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons/lib/icons";
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Input,
  List,
  Menu,
  Modal,
  Row,
  Table,
  Tooltip,
  Typography,
} from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../Assets/Sass/index.scss";

type Props = {};

const SideBar = (props: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    // <Sider
    //   trigger={null}
    //   collapsible
    //   collapsed={isCollapsed}
    //   style={{ height: "100%", width: "100%" }}
    // >
    //   <div
    //     className="text-right pr-2"
    //     onClick={() => setIsCollapsed(!isCollapsed)}
    //   >
    //     <BarsOutlined
    //       style={{ cursor: "pointer", color: "#fff", fontSize: 25 }}
    //     />
    //   </div>

    //   <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
    //     <Menu.Item
    //       key="1"
    //       icon={<PlusOutlined style={{ fontSize: 20 }} />}
    //       onClick={() => {
    //         // dispatch({
    //         //   type: "OPEN_FORM_CREATE_TASK",
    //         //   Component: <FormCreateTask />,
    //         //   title: "Create task",
    //         // });
    //       }}
    //     >
    //       <span className="mb-2">Create task</span>
    //     </Menu.Item>
    //     <Menu.Item key="2" icon={<SearchOutlined style={{ fontSize: 20 }} />}>
    //       Search
    //     </Menu.Item>
    //   </Menu>
    // </Sider>
    <>
      <div className="mb-3 flex items-start">
        <Typography.Title level={3} className="flex-grow">
          Projects
        </Typography.Title>
        {/* <Link
          to="/projects/new"
          className="flex justify-center items-center h-8 bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 text-white hover:text-white font-medium py-1.5 px-3 rounded cursor-pointer"
        >
          Create project
        </Link> */}
        <p>Create Project</p>
      </div>

      <div>
        <Input
          allowClear
          suffix={<SearchOutlined />}
          className="mb-6 w-48 rounded"
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
    </>
  );
};

export default SideBar;
