import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Button, Input, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { NavLink } from 'react-router-dom';

type Props = {}

const Login = (props: Props) => {

    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

    return (
        <form className=''>
            <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: window.innerHeight }}>
                <h1>Jira</h1>
                <div className='mt-3 w-50'>
                    <Input size="large" placeholder="Email" prefix='@' />
                </div>
                <div className='mt-3 w-50'>
                    <Input.Password size="large" placeholder="Password" prefix={<LockOutlined />} />
                </div>
                <div className='mt-3 w-50 d-flex justify-content-between'>
                    <Checkbox onChange={onChange}>Remember me</Checkbox>
                    <NavLink to=''>Recovery Password</NavLink>
                </div>
                <Button className='mt-4 w-50' size='large'>Login</Button>
            </div>
        </form>
    )
}

export default Login