import { CaretDownOutlined, CaretUpOutlined, CheckCircleFilled, ClockCircleOutlined, DownOutlined, EditFilled, MinusOutlined, PlusSquareFilled, UpOutlined, WarningFilled } from '@ant-design/icons';
import { Button, Col, Form, Input, InputNumber, Modal, Progress, Row, Select } from 'antd';
import { RequiredMark } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import React, { useState } from 'react'
import TextDetail from '../Components/TextDetail';
import TimeTracking from '../Components/TimeTracking';

type Props = {}

const { TextArea } = Input;
const { Option } = Select;
const OPTIONS = ['Option 1', 'Option 2', 'Option 3']

const Test = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('NAME');
    const [description, setDescription] = useState('Description');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

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
                                    <TextDetail description={description}/>
                                </Form.Item>
                                <hr />
                                <Form.Item label="Comments" required>
                                    <div className='d-flex'>
                                        <div className='icon me-4' style={{width: '10%'}}>
                                            <div className='rounded-circle p-2 bg-primary text-light'>NA</div>
                                        </div>
                                        <div className='comment' style={{width: '90%'}}>
                                            <TextArea/>
                                        </div>
                                    </div>
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
                                                <Select defaultValue="Option1" className='w-75' showArrow={false}>
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
                                                <Select defaultValue="Option1" className='w-100' showArrow={false}>
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
                                    <Select defaultValue="Option1" bordered={false} showArrow={false}>
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
                                            <div className='text-success'>
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
                                        value={selectedItems}
                                        onChange={setSelectedItems}
                                        options={filteredOptions.map((item) => ({
                                            value: item,
                                            label: item,
                                        }))}
                                        bordered={false}
                                        showArrow={false}
                                        
                                    >
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="reporter"
                                    label="REPORTER"
                                    rules={[{ required: true, message: 'Please choose the reporter' }]}
                                >
                                    <Input.Group>
                                        <Select defaultValue="Option1" showArrow={false} style={{ width: '50%' }}>
                                            <Option value="Option1">Option 1</Option>
                                            <Option value="Option2">Option 2</Option>
                                            <Option value="Option3">Option 3</Option>
                                        </Select>
                                    </Input.Group>
                                </Form.Item>
                                <Form.Item
                                    name="time"
                                    label="TIME TRACKING"
                                    rules={[{ required: true, message: 'Please enter the estimate' }]}>
                                    <TimeTracking />
                                </Form.Item>
                            </Form>
                            <div className='changer-time pt-4 border-top'>
                                <div>Creacte at <span>0 days</span> ago</div>
                                <div>Updated at <span>0 days</span> ago</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </>
    );
}

export default Test