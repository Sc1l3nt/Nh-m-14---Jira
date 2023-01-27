import { Button, Modal } from 'antd';
import React, { useState } from 'react'

type Props = {}

const TimeTracking = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} footer={false}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    )
}

export default TimeTracking