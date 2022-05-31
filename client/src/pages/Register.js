import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
export default function Register() {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')

  const navigate = useNavigate()
  const URL = "http://localhost:1337/api/register"


  const registerUser = (e) =>{
    e.preventDefault()
    axios.post(URL,{
      name,email,password
    })
    .then(data=>{
      if(data.data.status == "ok"){
        alert("User Registered")
        setError("")
        navigate('/login')
      }
      else {
        setError(data.data.error)
      }
    })
    .catch(err=>console.log(err))
  }

  return (
    <div>
        <h1>Please Register yourself</h1>
        <form onSubmit={registerUser}>
          <input type="text" placeholder='Enter your name' value={name} onChange={(e)=>setName(e.target.value)} />
          <br/>
          <input type='email' placeholder='Enter your Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
          <br/>
          <input type='password' placeholder='Enter your Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
          <br/>
          <input type = 'submit' value="Register" />
          <p>{error}</p>
        </form>
    </div>
  )
}
