import React from 'react'
import Navbar from "../../components/Navbar";
import Titles from '../../components/Title';
import Footer from '../../components/Footer';
import { DatePicker, Descriptions, Table, Typography } from 'antd';

function Presensi() {
  const { Title } = Typography;
  const onChange = (date, dateString) => {
    // console.log("date",date);
    // console.log("dateString",moment(dateString).month() + 1);
  };
  const columns = [
    {
      title: 'No',
      width: 100,
      dataIndex: 'no',
      key: 'no',
      fixed: 'left',
    },
    {
      title: 'Nik',
      width: 100,
      dataIndex: 'nik',
      key: 'nik',
      fixed: 'left',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: '1',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: '2',
    },
    {
      title: 'Salary',
      width: 200,
      dataIndex: 'salary',
      fixed: 'right',
      key: '3',
    },
  ];

  const data = [];
  for (let i = 1; i < 100; i++) {
    data.push({
      key: i,
      no:i,
      nik : '1234',
      name: `Edward ${i}`,
      address: `London Park no. ${i}`,
      salary:`12342123${i}`
    });
  }

  return (
    <>
    <Navbar />
    <Titles title={'Laporan Absensi & Penggajian'} />
    
    <div className="container-fluid p-5">
      <Title level={4}>Select Laporan / month</Title>
      <hr />
      <div className="d-flex flex-row align-items-center">
        <DatePicker onChange={onChange} picker="month" />
        <span className='ps-3'>Please insert date to check your report</span>
      </div>

      <br />

      <Descriptions title="Detail Report">
        <Descriptions.Item label="Fullname">Muhammad farisan</Descriptions.Item>
        <Descriptions.Item label="UserName">Farisan</Descriptions.Item>
        <Descriptions.Item label="Email">muhammad.farisan@gmail.com</Descriptions.Item>
        <Descriptions.Item label="Nik">1123412312</Descriptions.Item>
      </Descriptions>

      <br />
      <br />

      <Title level={4}>Report All</Title>
      <hr />

      <Table
        columns={columns}
        pagination={false}
        dataSource={data}
        scroll={{
          x: 1600,
          y: 300
        }}
      />

    </div>

    <Footer />
    </>
  )
}

export default Presensi