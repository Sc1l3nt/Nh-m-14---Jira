import React from 'react'
import { LockOutlined } from '@ant-design/icons';
import { Button, Input, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { NavLink } from 'react-router-dom';

type Props = {
    listRender: string[],
    textButton: string,
    link: JSX.Element|undefined
}

const FormInput = (props: Props) => {

    let { listRender, textButton, link } = props

    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const renderComponent = (component:JSX.Element|undefined) => {
        return component
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: window.innerHeight }}>
            <h1>Welcome</h1>
            {listRender?.map((item, i) => {
                let Component: JSX.Element|undefined
                switch (item) {
                    case 'email': {
                        Component = <Input size="large" placeholder="Email" prefix='@' />
                        break
                    }
                    case 'password': {
                        Component = <Input.Password size="large" placeholder="Password" prefix={<LockOutlined />} />
                        break
                    }
                    case 'comfirm': {
                        Component = <Input.Password size="large" placeholder="Comfirm Password" prefix={<LockOutlined />} />
                        break
                    }
                    case 'name': {
                        Component = <Input size="large" placeholder="Name" prefix='@' />
                        break
                    }
                    case 'phone': {
                        Component = <Input size="large" placeholder="Phone number" prefix='@' />
                        break
                    }
                    case 'remamber&recovery': {
                        Component = <div className='d-flex justify-content-between'>
                            <Checkbox onChange={onChange}>Remember me</Checkbox>
                            <NavLink to=''>Forgot Password?</NavLink>
                        </div>
                        break
                    }
                    default:{
                        Component = undefined
                    }
                }
                return <div key={i} className='mt-3 w-50'>
                    {renderComponent(Component)}
                </div>
            })}
            <Button className='mt-4 w-50' size='large'>{textButton}</Button>
            {renderComponent(link)}
        </div>
    )
}

export default FormInput