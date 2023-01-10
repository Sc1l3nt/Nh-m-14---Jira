import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

const HomeTemplate = (props: Props) => {
    return (
        <div>
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