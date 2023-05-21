import React, { useState } from 'react'

import Tables from '../../../components/table/Tb_DetailPenggajian'
import { Col, Input, Row } from 'antd';

function DataPenggajian() {
  const [data, setData] = useState({})

  const onChange = (e) => {
    // console.log(...data,{setData()});
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="fs-3">
        Data karyawan
        <hr />
      </div>

      <Row gutter={24} wrap={true}>
        <Col span={8}>
          <div className="" style={{marginTop:'10px', marginBottom:'10px'}}>
            <span>Name</span>
            <Input placeholder="Fullname" name='fullname' onChange={onChange} allowClear disabled />
          </div>
          <div className="" style={{marginTop:'10px', marginBottom:'10px'}}>
            <span>Divisi</span>
            <Input placeholder="Divisi" name='position' onChange={onChange} allowClear disabled />
          </div>
          <div className="" style={{marginTop:'10px', marginBottom:'10px'}}>
            <span>Address</span>
            <Input placeholder="Alamat" name='address' onChange={onChange} allowClear disabled />
          </div>
        </Col>
        <Col span={8}>
          <div className="" style={{marginTop:'10px', marginBottom:'10px'}}>
            <span>Presence / month</span>
            <Input placeholder="Absen Kehadiran" name='absensi' onChange={onChange} allowClear />
          </div>
          <div className="" style={{marginTop:'10px', marginBottom:'10px'}}>
            <span>Work overtime / month</span>
            <Input placeholder="Lemburan" name='lembur' onChange={onChange} allowClear />
          </div>
          <div className="" style={{marginTop:'10px', marginBottom:'10px'}}>
            <span>Fix Salary / month</span>
            <Input placeholder="Gaji" name='salary' onChange={onChange} allowClear disabled />
          </div>
        </Col>
        <Col span={8}>
          <div className="" style={{marginTop:'10px', marginBottom:'10px'}}>
            <span>Income</span>
            <Input placeholder="Pendapatan bersih" name='total' onChange={onChange} allowClear disabled />
          </div>
          <div className="">
            <span>Noted :</span>
            <br />
            <span>change attendance and overtime data if there is a data error or submission manually.</span>
            <br />
            <span style={{borderBottom:'1px solid grey'}}>calculation income :</span>
            <br />
            <p>= (overtime pay x work overtime) + ((absence deductible x number of absences) - Salary)</p>
          </div>
        </Col>
      </Row>
      <button className='bg-dark text-white rounded-4 px-5 py-1'>Verify</button>
      <br />
      <br />
      <br />
      <br />
    <Tables  />
    </>
  )
}

export default DataPenggajian