import React, { useState } from 'react';
import { Input } from 'antd';
import './Search.scss';

type Props = {}

const Searchs = (props: Props) => {
    const [search, setSearch] = useState('')
    const [width, setWidth] = useState('250px')
    return (
        <div className='search'>
            <div className='input' style={{ transition: 'all 1s', width: width }}>
                <Input
                    size="large"
                    placeholder="Search or jump to ... "
                    prefix={<div className='pe-2 text-primary'><i className="fa-solid fa-magnifying-glass"></i></div>}
                    allowClear
                    id="search"
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={()=>setWidth('500px')}
                    onBlur={()=>setWidth('250px')}
                />
            </div>
        </div>
    )
}

export default Searchs