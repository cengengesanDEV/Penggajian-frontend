import React from 'react'
import { useSelector } from 'react-redux'
import Factory from '../assets/factory.png'
import { Typography } from 'antd'
import Pattern from '../assets/patternpad.jpeg'

function Dashboard() {

  const { Title } =Typography
  const Email = useSelector((state) => state.auth.profile.email)
  
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center" style={{width:'100%', height:'550px', backgroundImage:`url(${Pattern})`}}>
        <Title level={3}>Hai, Welcome to sistem informasi PT CV Sodara Plastik</Title>
        <p>You now Login with account <b>{Email}</b></p>
      </div>
    </>
  )
}

export default Dashboard