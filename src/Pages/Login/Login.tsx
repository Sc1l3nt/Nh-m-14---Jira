import React from 'react';
import { NavLink } from 'react-router-dom';
import FormInput from '../../Components/FormInput';

type Props = {}

const Login = (props: Props) => {
    let listRender: string[] = [
        'email',
        'password',
        'remamber&recovery',
        'login'
    ]
    return (
        <form className='login'>
            <FormInput listRender={listRender} textButton='Login' link={<NavLink className='mt-2' to='/register'>I don't have an account</NavLink>} />

        </form>
    )
}

export default Login