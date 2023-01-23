import { CaretDownOutlined, CaretUpOutlined, CheckCircleFilled, DownOutlined, EditFilled, MinusOutlined, PlusSquareFilled, UpOutlined, WarningFilled } from '@ant-design/icons';
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select } from 'antd';
import { RequiredMark } from 'antd/es/form/Form';
import React, { useState } from 'react'

type Props = {}

const { TextArea } = Input;
const { Option } = Select;

const Test = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('NAME');
    const [description, setDescription] = useState('Description');

    const showModal = () => {
        setIsModalOpen(true);
    };

    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState<RequiredMark>('optional');

    const onRequiredTypeChange = ({ requiredMarkValue }: { requiredMarkValue: RequiredMark }) => {
        setRequiredMarkType(requiredMarkValue);
    };

    return (
        <>
            <Button onClick={showModal}>
                Open Modal
            </Button>
            <Modal open={isModalOpen} closable={false} footer={null} width={1000}>
                <Row gutter={18}>
                    <Col span={17}>
                        <div className='item item-left'>
                            <Form
                                form={form}
                                layout="vertical"
                                initialValues={{ requiredMarkValue: requiredMark }}
                                onValuesChange={onRequiredTypeChange}
                                requiredMark={requiredMark}
                            >
                                <Input value={name} bordered={false} onChange={(e) => { setName(e.target.value) }} suffix={<EditFilled />} className='mb-4' />
                                <Form.Item label="Description" required>
                                    <TextArea value={description} onChange={(e) => { console.log(e.target.value) }} />
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                    <Col span={7}>
                        <div className='item item-right'>
                            <Form layout="vertical" hideRequiredMark>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            name="type"
                                            label="TYPE"
                                            rules={[{ required: true, message: 'Please enter issue type' }]}
                                        >
                                            <Input.Group>
                                                <Select defaultValue="Option1">
                                                    <Option value="Option1">
                                                        <div className='text-success'>
                                                            <CheckCircleFilled className='icon fs-5' /><span className='title ms-2'>Task</span>
                                                        </div>
                                                    </Option>
                                                    <Option value="Option2">
                                                        <div className='text-danger'>
                                                            <WarningFilled className='icon fs-5' /><span className='title ms-2'>Bug</span>
                                                        </div>
                                                    </Option>
                                                    <Option value="Option3">
                                                        <div className='text-warning'>
                                                            <PlusSquareFilled className='icon fs-5' /><span className='title ms-2'>Story</span>
                                                        </div>
                                                    </Option>
                                                </Select>
                                            </Input.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="priority"
                                            label="Priority"
                                            rules={[{ required: true, message: 'Please enter priority' }]}
                                        >
                                            <Input.Group>
                                                <Select defaultValue="Option1">
                                                    <Option value="Option1">
                                                        <div className='text-danger'>
                                                            <CaretUpOutlined className='icon fs-5' /><span className='title ms-2'>Highest</span>
                                                        </div>
                                                    </Option>
                                                    <Option value="Option2">
                                                        <div className='text-warning'>
                                                            <UpOutlined className='icon fs-5' /><span className='title ms-2'>High</span>
                                                        </div>
                                                    </Option>
                                                    <Option value="Option3">
                                                        <div className='text-secondary'>
                                                            <MinusOutlined className='icon fs-5' /><span className='title ms-2'>Medium</span>
                                                        </div>
                                                    </Option>
                                                    <Option value="Option4">
                                                        <div className='text-success'>
                                                            <DownOutlined className='icon fs-5' /><span className='title ms-2'>Low</span>
                                                        </div>
                                                    </Option>
                                                    <Option value="Option5">
                                                        <div className='text-primary'>
                                                            <CaretDownOutlined className='icon fs-5' /><span className='title ms-2'>Lowest</span>
                                                        </div>
                                                    </Option>
                                                </Select>
                                            </Input.Group>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item
                                    name="status"
                                    label="STATUS"
                                    rules={[{ required: true, message: 'Please enter issue status' }]}
                                >
                                    <Select defaultValue="Option1">
                                        <Option value="Option1">
                                            <div className='text-secondary'>
                                                <div>BACKLOG</div>
                                            </div>
                                        </Option>
                                        <Option value="Option2">
                                            <div className='text-danger'>
                                                <div>SELECTED FOR DEVELOPMENT</div>
                                            </div>
                                        </Option>
                                        <Option value="Option3">
                                            <div className='text-warning'>
                                                <div>IN PROGRESS</div>
                                            </div>
                                        </Option>
                                        <Option value="Option4">
                                            <div className='text-warning'>
                                                <div>DONE</div>
                                            </div>
                                        </Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="assignees"
                                    label="ASSIGNEES"
                                    rules={[{ required: true, message: 'Please chosse the assignnees' }]}
                                >
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Please select"
                                        defaultValue={["Option1"]}
                                    >
                                        <Option value="Option1">Option 1</Option>
                                        <Option value="Option2">Option 2</Option>
                                        <Option value="Option3">Option 3</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="reporter"
                                    label="REPORTER"
                                    rules={[{ required: true, message: 'Please choose the reporter' }]}
                                >
                                    <Input.Group>
                                        <Select defaultValue="Option1">
                                            <Option value="Option1">Option 1</Option>
                                            <Option value="Option2">Option 2</Option>
                                            <Option value="Option3">Option 3</Option>
                                        </Select>
                                    </Input.Group>
                                </Form.Item>

                                <Form.Item
                                    name="estimate"
                                    label="ORIGINAL ESTIMATE (HOURS)"
                                    rules={[{ required: true, message: 'Please enter the estimate' }]}
                                >
                                    <InputNumber defaultValue={3} controls={false} />

                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </>
    );
}

export default Test