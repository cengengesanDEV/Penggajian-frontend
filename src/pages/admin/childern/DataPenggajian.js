import React, { useState } from 'react'

import Tables from '../../../components/table/Tb_DetailPenggajian'
import { Button, Col, Input, Row } from 'antd';
import { verifyAdmin } from '../../../utility/axios';
import moment from 'moment';
import { useSelector } from 'react-redux';

function DataPenggajian() {

  const token = useSelector((state) => state.auth.token)
  const [presensi, setPresensi] = useState(null)
  const [overtime, setOvertime] = useState(null)
  const [datakaryawan, setDatakaryawan] = useState({})
  const [flag, setFlag] = useState(0)
  const [loading, setLoading] = useState(false)


  const handleVerify = () => {
    setLoading(true)
    verifyAdmin({
      id_users: datakaryawan.id,
      date: `${datakaryawan.date.year}-${datakaryawan.date.month}-25`,
      total: Math.floor((Number(overtime) * Number(datakaryawan.overtime_salary)) + ((Number(datakaryawan.basic_salary)/22) * Number(presensi)))
    }, token)
    .then(res => {setDatakaryawan({});setPresensi(null);setOvertime(null); setFlag(Math.random() * 10000000000000)})
    .catch((err) => console.log(err))
    .finally(() => setLoading(false))
  }

  const costing = (price) => {
    return (
      "Rp " +
      parseFloat(price)
          .toFixed()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
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
            <Input placeholder="Fullname" name='fullname' value={datakaryawan.fullname} allowClear disabled />
          </div>
          <div className="" style={{marginTop:'10px', marginBottom:'10px'}}>
            <span>Divisi</span>
            <Input placeholder="Divisi" name='position' value={datakaryawan.position} allowClear disabled />
          </div>
          <div className="" style={{marginTop:'10px', marginBottom:'10px'}}>
            <span>NIK</span>
            <Input placeholder="Nomor Induk Karyawan" name='nik' value={datakaryawan.nik} allowClear disabled />
          </div>
        </Col>
        <Col span={8}>
          <div className="" style={{marginTop:'10px', marginBottom:'10px'}}>
            <span>Presence / month</span>
            <Input placeholder="Absen Kehadiran" name='absensi' value={presensi} onChange={(e) => setPresensi(e.target.value)} allowClear />
          </div>
          <div className="" style={{marginTop:'10px', marginBottom:'10px'}}>
            <span>Work overtime / month</span>
            <Input placeholder="Lemburan" name='lembur' value={overtime} onChange={(e) => setOvertime(e.target.value)} allowClear />
          </div>
          <div className="" style={{marginTop:'10px', marginBottom:'10px'}}>
            <span>Fix Salary / month</span>
            <Input placeholder="Gaji" name='salary' value={datakaryawan?.basic_salary == undefined ? costing(0) : costing(datakaryawan.basic_salary)} allowClear disabled />
          </div>
        </Col>
        <Col span={8}>
          <div className="" style={{marginTop:'10px', marginBottom:'10px'}}>
            <span>Income</span>
            <Input placeholder="Pendapatan bersih" name='total' 
            value={presensi === null && overtime === null ? costing(0) : costing(Math.floor((Number(overtime) * Number(datakaryawan.overtime_salary)) + ((Number(datakaryawan.basic_salary)/22) * Number(presensi))))} 
            allowClear disabled />
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
      <Button loading={loading} onClick={() => handleVerify()} type='primary' disabled={presensi === null || overtime === null ? true : false} className='px-5 py-1'>Verify</Button>
      <br />
      <br />
      <br />
      <br />
    <Tables flag={flag} data={(value) => {setDatakaryawan(value); setPresensi(value.jumlah_masuk); setOvertime(value.total_jam_lembur) ;console.log(value)}}  />
    </>
  )
}

export default DataPenggajian