import React from 'react'
import EditPenggajian from './EditPenggajian'
import Tables from '../../../components/table/Tb_DetailPenggajian'

function DataPenggajian() {
  return (
    <>
    <EditPenggajian />
    <button className='bg-dark text-white rounded-4 px-5 py-1'>Verify</button>
    <br />
    <br />
    <br />
    <br />
    <Tables />
    </>
  )
}

export default DataPenggajian