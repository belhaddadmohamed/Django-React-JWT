import { Outlet, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { AuthContext } from "../context"

// Children is the tags inside Route, ...rest is the rest of the parameters (like: **kwargs in python)

const PrivateRoutes = () => {
  
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()


  return (

      user ? 
      <Outlet/> : useEffect(()=>{
                    navigate('login')
                  }, [user])
      


    // user ? <Outlet/> : <Navigate to={<LoginPage/>} />
    // <Navigate to={<LoginPage/>} />
    // <Outlet/>
  )
}

export default PrivateRoutes