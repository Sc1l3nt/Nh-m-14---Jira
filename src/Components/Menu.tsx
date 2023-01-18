import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Assets/Sass/Components/Menu.scss'

type Props = {}

const Menu = (props: Props) => {
    return (
        <div className='menu'>
            <div style={{ height: window.innerHeight }}>
                <div className='d-flex align-items-start flex-column px-4 position-relative'>
                    <NavLink className='link d-flex' to={'projectmanagement'}>
                        <i className="fa-solid fa-bars-progress"></i>
                        <div className='title'>Project Management</div>
                    </NavLink>
                    <NavLink className='link d-flex' to={'login'}>
                        <i className="fa-solid fa-right-to-bracket"></i>
                        <div className='title'>Login</div>
                    </NavLink>
                    <div className='line position-absolute' />
                </div>
            </div>
        </div>
    )
}

export default Menu