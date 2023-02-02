import React, { useState } from "react";
import { Button, Drawer, Space } from "antd";
import CreateIssue from "../../Pages/CreateIssue/CreateIssue";

type Props = {
  component: React.FC;
  icon: JSX.Element;
};

const PopUpMobile = (props: Props) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  let Component: React.FC = props.component;
  let Icon: JSX.Element = props.icon;

  return (
    <>
      <button className="btn" onClick={showDrawer}>
        {Icon}
      </button>
      <Drawer
        title="Create a new issue"
        width={window.innerWidth}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Component />
      </Drawer>
    </>
  );
};

export default PopUpMobile;
