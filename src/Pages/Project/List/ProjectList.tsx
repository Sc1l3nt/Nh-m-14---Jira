import { DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Row, Space, Table, Tag } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import Search from "antd/es/input/Search";
import React from "react";
import Icon from "@ant-design/icons/lib/components/Icon";

type Props = {};

interface DataType {
  key: string;
  id: string;
  projectName: string;
  categoryName: string;
  creator: string;
  members: string[];
  //   tags: string[];
}

const ProjectList = (props: Props) => {
  const columns: ColumnsType<DataType> = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Project name",
      dataIndex: "projectName",
      key: "projectName",
      defaultSortOrder: "descend",
      //sortDirections: ["descend"],
      sorter: (a, b) => a.projectName.length - b.projectName.length,
    },
    {
      title: "Category name",
      dataIndex: "categoryName",
      key: "categoryName",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
    },
    {
      title: "Members",
      key: "members",
      dataIndex: "members",
      render: (_: any, { members }): any => {
        <>
          {members.map((member) => {
            let color = member.length > 5 ? "geekblue" : "green";
            if (member === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={member}>
                {member.toUpperCase()}
              </Tag>
            );
          })}
        </>;
      },
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <SettingOutlined style={{ cursor: "pointer", fontSize: "22px" }} />
          <DeleteOutlined
            style={{ cursor: "pointer", color: "red", fontSize: "22px" }}
          />
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      id: "1",
      projectName: "Project Name",
      categoryName: "Category Name",
      creator: "Bao Bao",
      members: ["heart", "spades"],
      tags: ["developer", "coder"],
    },
    // {
    //   key: "2",
    //   name: "Jim Green",
    //   age: 42,
    //   address: "London No. 1 Lake Park",
    // },
    // {
    //   key: "3",
    //   name: "Joe Black",
    //   age: 32,
    //   address: "Sidney No. 1 Lake Park",
    // },
    // {
    //   key: "4",
    //   name: "Jim Red",
    //   age: 32,
    //   address: "London No. 2 Lake Park",
    // },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <>
      <Row style={{ padding: "20px" }}>
        <Col>
          <Search />
        </Col>
        <Col>
          <Button type="primary">Create Project</Button>
        </Col>
      </Row>
      <Row style={{ padding: "20px" }}>
        <Col span={24}>
          <Table columns={columns} dataSource={data} onChange={onChange} />;
        </Col>
      </Row>
    </>
  );
};

export default ProjectList;
