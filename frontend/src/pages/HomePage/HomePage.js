import './HomePage.css'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context'


const HomePage = () => {
  let [notes, setNotes] = useState([])
  let {authTokens} = useContext(AuthContext)


  useEffect(()=>{
    getNotes()
  }, [])


  let getNotes = async() => {
    let response = await fetch('http://127.0.0.1:8000/api/notes/', {
      method: 'GET', 
      headers: {
        'Content-type':'application/json',
        'Authorization':'Bearer' + String(authTokens.access)    // Bearer is the type of sending JWT used in SETTINGS.PY (DJANGO)
      }
    })

    let data = await response.json()
    setNotes(data)
  }


  return (
    <ul>
      {notes.map(note => (
        <li className='notes' key={note.id}>  {note.body}  </li> 
      ))}
    </ul>

  )
}

export default HomePage