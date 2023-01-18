import React from 'react'
import '../Assets/Sass/Components/Header.scss'

type Props = {}

const Header = (props: Props) => {
    return (
        <div className='header px-5 py-3 border bg-primary'>
            <div className='d-flex position-relative'>
                <div className='logo border border-3 rounded-circle border-primary position-absolute bg-light'>
                    <img className='w-100 p-3' src="../images/Jira-Logo.png" alt="" />
                </div>
                <h2 className='title text-light'>Jira</h2>
                <div className='user ms-auto'>
                    <button className='bg-transparent d-flex'>
                        <div className='border rounded-circle border-light border-2'>
                            <div className='btn rounded-circle border-primary px-2 bg-light border-2'>Na</div>
                        </div>
                        <span className='arrow'>
                            <i className="fa-solid fa-sort-down"></i>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header