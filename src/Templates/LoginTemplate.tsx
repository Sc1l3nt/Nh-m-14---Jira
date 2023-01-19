import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Sider, Content } = Layout;

type Props = {};

const LoginTemplate = (props: Props) => {
  return (
    <Layout style={{ overflow: "hidden", backgroundColor: "transparent" }}>
      <Sider width={(window.innerWidth / 6) * 4}>
        <img
          src="https://i.pinimg.com/originals/50/05/db/5005dbccb59bc9929274c043b848eb84.gif"
          alt=""
          style={{
            imageResolution: "300dpi",
            objectFit: "contain",
            height: "100vh",
          }}
        />
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default LoginTemplate;
