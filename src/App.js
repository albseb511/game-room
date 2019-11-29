import React,{useState} from 'react';
import './App.css'
import {ChatRoom} from './components/ChatRoom'

const App = () => {
  const [id,setId] = useState("");
  const [name, setName] = useState("")
  const handleSubmit = e => {
    e.preventDefault()
    if(name === '')
      return alert('empty')
    setId(name)   
  }
  return id!==""?
  <>
    <div>Hello {id}</div>
    <ChatRoom/>
  </>:
  <div>
    <form onSubmit={e=>handleSubmit(e)}>
      <label>Create username</label>
      <br/>
      <input 
        id='name'
        onChange={(e)=>setName(e.target.value.trim())}
        required
        placeholder="please enter your username"/>
        <br/>
        <button type="submit">
          JOIN ROOM
        </button>
      <br/>
    </form>
  </div>
}


export {App};
