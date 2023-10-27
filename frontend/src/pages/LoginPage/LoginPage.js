import { useContext } from 'react'
import './LoginPage.css'
import { AuthContext } from '../../context'


const LoginPage = () => {

    let {loginUser} = useContext(AuthContext)


    return (
        <form onSubmit={loginUser} method='POST'>
            <input type='text' name='name' placeholder='Enter Your username' />
            <input type='password' name='password' placeholder='Enter Your password' />
            <input type='submit' />
        </form>
    )
}

export default LoginPage