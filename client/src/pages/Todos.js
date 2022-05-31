import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

function Todos() {
  const [todos,setTodos] = useState([])
  const [inputVal,setInputVal] = useState('')
  const [editTodoInput,setEditTodoInput] = useState('')
  const [editTodoStyle,setEditTodoStyle] = useState('none')
  const [currentTodo,setCurrentTodo] = useState('')

  const navigate = useNavigate()
  const URL = "http://localhost:1337/api/todos"

  useEffect(()=>{
    const token = sessionStorage.getItem('token')
    if(token){
      const user = jwtDecode(token)
      if(!user){
        sessionStorage.removeItem('token')
        navigate('/')
      }
      else {
        axios.get(URL,{
          headers:{
            'x-auth-token':token
          }
        })
        .then(res=>{
          // console.log(res.data.data)
          setTodos(res.data.data)
        })
        .catch(err=>{
          console.log(err)
        })
      }
    }
  },[])


  const addTodoHandler = (event) =>{
    event.preventDefault()
    if(inputVal !== ""){
      axios.post(URL,{
        todo:inputVal
      },{
        headers:{
          'x-auth-token':sessionStorage.getItem('token')
      }})
      .then(res=>{
        if(res.data.status === 'ok'){
          alert('Todo Added')
          setTodos([...todos,inputVal])
          setInputVal('')
        }
        else{
          alert(res.data.error)
        }
      })
    }
    else{
      alert("Please enter a todo")
    }
  }

  const deleteTodoHandler = (todo) =>{
    axios.delete(URL+'/'+todo,{
      headers:{
        'x-auth-token':sessionStorage.getItem('token')
      },
      data:{
        todo
      }
    })
    .then(res=>{
      if(res.data.status === 'ok'){
        setTodos(todos.filter(item=>item!==todo))
      }
      else{
        alert(res.data.error)
      }
    })
  }

  const editTodoHandler = (e) =>{
    e.preventDefault()
    setEditTodoStyle('none')
    axios.put(URL+'/'+currentTodo,{
      headers:{
        'x-auth-token':sessionStorage.getItem('token')
      },
      currentTodo,
      editTodoInput
    }).then(res=>{
      let updatedTodos = res.data.data
      setTodos(updatedTodos)
    })
    setEditTodoInput('')
  }

  return (
    <div>
      <input value ={inputVal} placeholder="Add Todo" 
        onChange={(e)=>setInputVal(e.target.value)}
      />
      <button onClick={addTodoHandler}>Add Todo</button>
      {todos &&
        todos.map((todo,index)=>{
          return (
            <div key={index} className='todoContainer' style={{"border":"2px solid black"}}>
              <p>{todo}</p>
              <button onClick={()=> deleteTodoHandler(todo)}>Delete</button>
              <button onClick={()=> {
                setCurrentTodo(todo)
                setEditTodoStyle('block')
              }}>Edit</button>
            </div>
            )
        })
      }
      <form onSubmit= {editTodoHandler} >
        <input 
          type="text" 
          placeholder='Edit your Todo' 
          style={{"display":editTodoStyle}} 
          value = {editTodoInput} 
          onChange={(e)=>setEditTodoInput(e.target.value)} 
        />
        <input 
          type='submit' 
          value = 'Edit Todo' 
          style={{"display":editTodoStyle}} 
        />
      </form>
    </div>
  )
}

export default Todos
