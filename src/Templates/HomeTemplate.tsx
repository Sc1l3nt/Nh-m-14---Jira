import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'

type Props = {}

const HomeTemplate = (props: Props) => {
    return (
        <div>
            <Header></Header>
            <div className='d-flex'>
                <div className='item-left px-5'>
                    HomeTemplate
                </div>
                <div className='item-right px-5'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default HomeTemplate