import { ClockCircleOutlined } from '@ant-design/icons';
import { Form, InputNumber, Modal, Progress } from 'antd';
import React, { useState } from 'react'

type Props = {}

const TimeTracking = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [estimate, setEstimate] = useState<number>(3);
    const [logged, setLogged] = useState<number>(1);
    const [remaining, setRemaining] = useState<number>(0);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false)
    };

    const handleOk = () => {
        setIsModalOpen(false)
    };

    const onChangeNumber = (e: number | null, name: string) => {
        if (typeof e === 'number') {
            switch (name) {
                case 'estimate':
                    setEstimate(e);
                    break;
                case 'spent':
                    setLogged(e);
                    break;
                case 'remaining':
                    setRemaining(e);
                    break;
                default:
                    break;
            }
        }
    }
    return (
        <>
            <div onClick={showModal} style={{cursor: 'pointer'}}>
                <div className='d-flex'>
                    <div className='fs-5' style={{ width: '15%' }}>
                        <ClockCircleOutlined />
                        <div className='fs-6'>{estimate}h</div>
                    </div>
                    <div className='' style={{ width: '85%' }}>
                        <Progress percent={remaining == 0 ? (logged * 100 / estimate) : (logged * 100 / (logged + remaining))} showInfo={false} />
                        <div className='d-flex justify-content-between'>
                            <div>{logged}<span>h logged</span></div>
                            <div className={remaining == 0 ? 'd-none' : 'd-block'}>{remaining}<span>h remaining</span></div>
                            <div className={remaining == 0 ? 'd-block' : 'd-none'}>{estimate}<span>h estimate</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title="Time Tracking" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form.Item
                    name="estimate"
                    label="Original estimate (hours)"
                    rules={[{ required: true, message: 'Please enter original estimate' }]}>
                    <InputNumber min={0} defaultValue={estimate} onChange={e => onChangeNumber(e, 'estimate')} controls={false} />
                </Form.Item>
                <div className='d-flex justify-content-between'>
                    <Form.Item
                        name="spent"
                        label="Time spent (hours)"
                        rules={[{ required: true, message: 'Please enter time spent' }]}>
                        <InputNumber min={0} defaultValue={estimate} onChange={e => onChangeNumber(e, 'spent')} controls={false} />
                    </Form.Item>
                    <Form.Item
                        name="remaining"
                        label="Time remaining (hours)"
                        rules={[{ required: false, message: 'Please enter time remaining' }]}>
                        <InputNumber min={0} defaultValue={estimate} onChange={e => onChangeNumber(e, 'remaining')} controls={false} />
                    </Form.Item>
                </div>
                <Progress percent={remaining == 0 ? (logged * 100 / estimate) : (logged * 100 / (logged + remaining))} showInfo={false} />
                <div className='d-flex justify-content-between'>
                    <div>{logged}<span>h logged</span></div>
                    <div className={remaining == 0 ? 'd-none' : 'd-block'}>{remaining}<span>h remaining</span></div>
                    <div className={remaining == 0 ? 'd-block' : 'd-none'}>{estimate}<span>h estimate</span></div>
                </div>
            </Modal>
        </>
    )
}

export default TimeTracking