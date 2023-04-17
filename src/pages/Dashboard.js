import React, { useState } from 'react'
import Layout from '../Components/Layouts'



function Dashboard() {
  const [role, setRole] = useState("admin")

  return (
    <Layout username={role} roles={"admin"} />
  )
}

export default Dashboard