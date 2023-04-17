import React from 'react'

import Layouts from '../../Components/Layouts'
import { useNavigate } from 'react-router-dom'




function ListKaryawan() {
  const navigate = useNavigate()
  return (
    <>
    <p>Listkaryawan admin</p>
    <button onClick={() => navigate("/detail")}>asdasd</button>
    </>
  )
}

export default ListKaryawan