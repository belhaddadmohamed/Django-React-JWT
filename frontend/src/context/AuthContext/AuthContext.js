import { createContext, useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'


// Context
const AuthContext = createContext()
export default AuthContext


// Provider
export const AuthProvider = ({children}) => {
    
    // localStorage is to keep the user authenticated even if we refresh the page (*Component life cycle)
    // Callback function
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] =  useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    const navigate = useNavigate()


    const loginUser = async (e) => {
        e.preventDefault()

        // Fetch the API + Fill with values that we've submited in the form + Get the response (token) 
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({'username':e.target.name.value, 'password':e.target.password.value})
        })

        let data = await response.json()

        // Print response in console
        console.log('Data: ', data)
        console.log('Response: ', response)

        // Check if it's a valide response
        if(response.status === 200){
            setAuthTokens(data)                                    // Token success + refresh
            setUser( jwt_decode(data.access) )                     // Token success -> JSON(token+...+username)
            localStorage.setItem('authTokens', JSON.stringify(data))    // Store the token to prevent losing it after refresh the page
            navigate('/')                                          // Redirect the user to the Homepage
        }else{
            alert('Something went wrong !!')
        }
    }


    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')   // Remove the token from storage
        navigate('login')                       // Redirect to 'login.html' page
    }


    // Use 'Refresh Token' to get new 'access Token'
    const updateToken = async () => {
        console.log('Update Token')
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({'refresh':authTokens.refresh})
        })

        let data = await response.json()

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }
        else{
            logoutUser()
        }

    }


    // Provider values
    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser
    }


    // Instructions in useEffect did reload after authTokens, loading been changes
    useEffect(()=>{

        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)    // Rotate after 2 seconds

        return ()=> clearInterval(interval)     // To override the current interval time

    }, [authTokens, loading])


    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

