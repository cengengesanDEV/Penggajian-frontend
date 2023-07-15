import React, { useEffect, useState } from 'react'
import Navbar from "../../components/Navbar";
import Titles from '../../components/Title';
import Footer from '../../components/Footer';
import { DatePicker, Descriptions, Table, Typography } from 'antd';
import { absensiKaryawan, penggajianKaryawan } from '../../utility/axios';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function Presensi() {

  const { Title } = Typography;
  const token = useSelector((state) => state.auth.token)

  const [date, setDate] = useState({
    month: moment().month() + 1,
    year: moment().year()
  })
  const [salary, setSalary] = useState({})
  const [presensi, setPresensi] = useState([])
  const [keterangan, setKeterangan] = useState({})

  const onChange = (date, dateString) => {
    setDate({
      month : moment(dateString).month() + 1,
      year : moment(dateString).year()
    })
  };

  const getAbsentandSalary = async () => {
    try {
      const getabsent = await absensiKaryawan(date.month, date.year, token)
      const getsalary = await penggajianKaryawan(date.month, date.year, token)
      if(getsalary.data.data.length == 0) setSalary({})
      if(getsalary.data.data[0]) setSalary(getsalary?.data?.data[0])
      setPresensi(getabsent.data.data.data_absent)
      setKeterangan(getabsent.data.data)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAbsentandSalary()
  },[date])

  const costing = (price) => {
    return (
       "Rp " +
       parseFloat(price)
          .toFixed()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
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
      title: 'Clock-in',
      dataIndex: 'clock-in',
      key: '1',
    },
    {
      title: 'Clock-out',
      dataIndex: 'clock-out',
      key: '2',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: '3',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      fixed: 'right',
      width:100,
      key: '4',
    }
  ];

  

  return (
    <>
    <Navbar />
    <Titles title={'Laporan Absensi & Penggajian'} />
    
    <div className="container-fluid p-5">
      <Title level={4}>Select Laporan / month</Title>
      <hr />
      <div className="d-flex flex-row align-items-center">
        <DatePicker defaultValue={dayjs()} format={'YYYY-MM'}  clearIcon={false} onChange={onChange} picker="month" />
        <span className='ps-3 fs-6'>Please insert date to check your salary</span>
      </div>

      <br />

      <Descriptions title="Detail Salary">
        <Descriptions.Item label="Total Salary">{salary.total_salary ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="Total Entry">{keterangan.jumlah_masuk ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="Total permissions">{keterangan.jumlah_izin ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="Total Sick">{keterangan.jumblah_sakit ?? '-'}</Descriptions.Item>
        
        <Descriptions.Item label="Date Paid">{salary.date_paid?.slice(0,10) ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="Noted">Total Salary = Basic salary + (overtime salary x overtime hours)</Descriptions.Item>
        <Descriptions.Item label="Total Lembur">{salary.total_jam_lembur ?? '-'}</Descriptions.Item>
      </Descriptions>
      

      <br />
      <br />

      <Title level={4}>Presensi</Title>
      <hr />

      <Table
        columns={columns}
        pagination={false}
        dataSource={presensi?.map((e,i) => ({
          key: i,
          no:i + 1,
          'clock-in':e.clockin,
          'clock-out': e.clockout,
          date:e.date,
          description: e.description
        }))}
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