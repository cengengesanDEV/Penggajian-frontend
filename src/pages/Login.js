import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()
  return (
    <>
    <p>Login</p>
    <input type="text" name="" id="" />
    <input type="text" name="" id="" />
    <button onClick={()=> navigate('/home')}>Masuk</button>
    </>
  )
}

export default Login