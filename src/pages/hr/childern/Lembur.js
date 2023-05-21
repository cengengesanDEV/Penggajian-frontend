import { Button, Col, DatePicker, Descriptions, Input, Row, Select, Space, Tag, Typography } from 'antd';
import React from 'react'
import css from '../../../style/admin/DetailKaryawan.module.css'

function Lembur() {

  const { Title } = Typography;

  const Datauser = () => {
    return [
      {
        value: 'admin',
        label: '1. Admin',
      },
      {
        value: 'hrd',
        label: '2. Hrd',
      },
      {
        value: 'users',
        label: '3. Users',
      },
    ]
  }

  const onChange = (value) => {
    console.log("ssd", value)
  }

  return (
    <>
      {/* <div>iduser, jamlembur, desc</div> */}
      <Title level={4}>Add lembur karyawan</Title>
      <hr />
      <Select
        defaultValue=""
        style={{
          width: 200,
        }}
        onChange={onChange}
        options={Datauser()}
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
      />
      <Row>
        <Col className='pt-3' span={12}>
          <Descriptions title="Detail">
            <Descriptions.Item label="Name">Udin Komang</Descriptions.Item>
            <Descriptions.Item label="NIK">1234456772</Descriptions.Item>
            <Descriptions.Item label="Divisi">CEO</Descriptions.Item>
            <Descriptions.Item label="Address">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel veniam ipsa exercitationem?</Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12} className='pt-3'>
          <Title level={5}>Input Data</Title>
          <hr />
          <Row gutter={24}>
            <Col span={12}>
              <p>Jam Lembur / Hours</p>
              <Input placeholder="address" name='address' onChange={onChange} allowClear />
            </Col>
            <Col span={12}>
              <p>Date Overtime</p>
              <Input placeholder="address" name='address' onChange={onChange} allowClear />
            </Col>
          </Row>
          <div className="pt-3">
            <p>Description</p>
            <Input placeholder="address" name='address' onChange={onChange} allowClear />
          </div>
          <Button className='mt-3' type="primary">Create</Button>
          <Button className='ms-3' danger>Clear / Cancel</Button>
        </Col>
      </Row>

        <br />
        <br />
        <br />
      <Title level={4}>View Data lembur</Title>
      <hr />

      <div className="container px-5'" style={{height:'500px', overflowY: 'scroll'}}>
        <div className={`sticky-top bg-dark ${css.search} `}>
          <p className={css.title_search}>Filter : </p>
           <Space direction="vertical">
            <DatePicker onChange={onChange} picker="month" />
          </Space>
          <p className={css.desc_search}>Please choose your date if you want to filter data</p>
        </div>
        <hr />
        <table className={`table table-responsive`} >
          <thead className={`text-white bg-dark  ${css.table_head}`}>
            <tr className="">
              {/* <div>NO, NAMA, JABATAN, TANGGAL, </div> */}
              <th scope='col' className='text-center'>No</th>
              <th scope='col'>Name</th>
              <th scope='col'>Divisi</th>
              <th scope='col'>Date</th>
              <th scope='col'>Salary</th>
              <th className='text-center' scope='col'>Status</th>
            </tr>
          </thead>
          <tbody className={`table-group-divider ${css.table_body}`}>
              <tr>
                <th scope='row'className="text-center">1</th>
                <td>Udin</td>
                <td>Staff</td>
                <td>10</td>
                <td>800000</td>
                <td className='text-center'><Tag color="red" >Menunggu Verifikasi</Tag></td>
              </tr>
          </tbody>
        </table>
      </div>


    </>
  )
}

export default Lembur