import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
function Login() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  const URL = "http://localhost:1337/api/login"


  const loginUser = (event) =>{
    event.preventDefault()
    axios.post(URL,{
      email,password
    })
    .then(result=>{
      if(result.data.user){
        sessionStorage.setItem("token",result.data.user)
        alert('Login Succesfull')
        navigate('/todos')
      }
      else{
        alert("Please enter correct credentials")
      }
      
    })
    .catch(err=>console.log(err))
  }

  return (
    <div>
      <h1>Please Login</h1>
      <form onSubmit={loginUser}>
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
