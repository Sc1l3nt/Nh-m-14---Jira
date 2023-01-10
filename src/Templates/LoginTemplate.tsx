import React from 'react'
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Sider, Content } = Layout;

type Props = {}

const LoginTemplate = (props: Props) => {
    return (
        <Layout>
            <Sider width={window.innerWidth / 5 * 3} style={{ height: window.innerHeight}}>
                <div className='px-5'>
                    <img src="https://picsum.photos/300" alt="..." />
                </div>
            </Sider>
            <Layout>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default LoginTemplate