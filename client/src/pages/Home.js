import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {

    const navigate = useNavigate()

  return (
    <div>
        <h1>Please Register or Login</h1>
        <button onClick={()=>navigate('/register')}>Register </button>
        <button onClick={()=>navigate('/login')}>Login </button>
    </div>
  )
}
