import './Header.css'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/index'

const Header = () => {

  let {user, logoutUser} = useContext(AuthContext)

  return (
    <>
      <ul>
          <li> <Link className="active" to="/">Home</Link> </li>
          <li> <Link to="profile">Profile</Link>      </li>
          <li> <Link to="contact">Contact</Link>   </li>
          { user ? 
              (<li> <button onClick={logoutUser}>Logout</button> </li>) :
              (<li> <Link to="login">Login</Link> </li>) }
      </ul>
       
      <h3>Hello {user ? user.username : ""}</h3>
      <h4> {user ? user.id : ""} </h4>
    </>
  )
}

export default Header