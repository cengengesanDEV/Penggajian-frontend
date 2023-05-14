import { Col, Input, Row, } from 'antd'
import React, { useState } from 'react'

function EditPenggajian() {
  const [data, setData] = useState({})

  const onChange = (e) => {
    // console.log(...data,{setData()});
    setData({ ...data, [e.target.name]: e.target.value });
  };
  console.log(data)

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
            <Input placeholder="input with clear icon" onChange={onChange} allowClear disabled />
          </div>
          <div className="" style={{marginTop:'10px', marginBottom:'10px'}}>
            <span>Divisi</span>
            <Input placeholder="input with clear icon" onChange={onChange} allowClear disabled />
          </div>
          <div className="" style={{marginTop:'10px', marginBottom:'10px'}}>
            <span>Address</span>
            <Input placeholder="input with clear icon" onChange={onChange} allowClear disabled />
          </div>
        </Col>
        <Col span={8}>
          <div className="" style={{marginTop:'10px', marginBottom:'10px'}}>
            <span>Presence / month</span>
            <Input placeholder="input with clear icon" onChange={onChange} allowClear />
          </div>
          <div className="" style={{marginTop:'10px', marginBottom:'10px'}}>
            <span>Work overtime / month</span>
            <Input placeholder="input with clear icon" onChange={onChange} allowClear />
          </div>
          <div className="" style={{marginTop:'10px', marginBottom:'10px'}}>
            <span>Fix Salary / month</span>
            <Input placeholder="input with clear icon" onChange={onChange} allowClear disabled />
          </div>
        </Col>
        <Col span={8}>
          <div className="" style={{marginTop:'10px', marginBottom:'10px'}}>
            <span>Income</span>
            <Input placeholder="input with clear icon" onChange={onChange} allowClear disabled />
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
    </>
  )
}

export default EditPenggajian