import React, { useState } from 'react';
import { Button, Drawer, FloatButton, Space } from 'antd';
import CreateIssue from '../Pages/CreateIssue/CreateIssue';

type Props = {}

const PopUp = (props: Props) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <FloatButton shape="circle" type="primary" style={{ right: 40 }} icon={<i className="fa-solid fa-plus"></i>}  onClick={showDrawer}/>
            <Drawer
                title="Create a new issue"
                width={720}
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
                <CreateIssue/>
            </Drawer>
        </>
    );
}

export default PopUp