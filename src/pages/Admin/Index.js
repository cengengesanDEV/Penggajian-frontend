import React from 'react'
import Layouts from '../../Components/Layouts'
import ListKaryawan from './ListKaryawan'
import DashboardAdmin from './DashboardAdmin'

function Index() {

  const testing = {
    render:<DashboardAdmin />
  }
  return (
    <>
      <Layouts username="Admin" roles="admin" dashboardadmin={testing.render} />
    </>
  )
}

export default Index