import React from 'react'
import CreateIssue from '../Pages/CreateIssue/CreateIssue'
import Search from '../Pages/Search/Searchs'
import './HeaderMobile.scss'
import PopUpMobile from './PopUpMobile'

type Props = {}

const HeaderMobile = (props: Props) => {
    return (
        <div className='header-mobile'>
            <div className='px-3 py-1 bg-primary box'>
                <div className='d-flex justify-content-between'>
                    <PopUpMobile component={Search} icon={<i className="fa-solid fa-magnifying-glass"></i>}/>
                    <div className="logo border border-3 rounded-circle border-primary position-absolute bg-light">
                        <div className="border border-3 rounded-circle border-light">
                            <div className="border border-3 rounded-circle border-primary">
                                <img className="w-100 p-2" src="../images/Jira-Logo.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <PopUpMobile component={CreateIssue} icon={<i className="fa-solid fa-plus"></i>}/>
                </div>
            </div>
        </div>
    )
}

export default HeaderMobile