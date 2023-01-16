import { Input, Typography, Select, Button } from "antd";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";

type Props = {};

const ProjectNew = (props: Props) => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const [value, setValue] = useState("");
  return (
    <div className="p-3">
      <span>New Project</span>
      <br />
      <Typography.Text>Project Name</Typography.Text>
      <Input placeholder="Basic usage" />
      <Typography.Text>Project Category</Typography.Text>
      <br />
      <Select
        defaultValue="Dự án web"
        style={{ width: "100%" }}
        onChange={handleChange}
        options={[
          {
            value: "Dự án web",
            label: "Dự án web",
          },
          {
            value: "Dự án phần mềm",
            label: "Dự án phần mềm",
          },
          {
            value: "Dự án di động",
            label: "Dự án di động",
          },
        ]}
      />
      <Typography.Text>Description</Typography.Text>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        style={{ height: "30vh" }}
      />
      <div className="my-5"></div>
      <Button type="text" style={{ backgroundColor: "#eee" }}>
        Cancel
      </Button>
      <Button type="primary">Create</Button>
    </div>
  );
};

export default ProjectNew;
