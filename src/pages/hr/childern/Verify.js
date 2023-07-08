import { Button, DatePicker, Space, Table, Typography, message } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { GetverifyHrd, verifyHrd } from '../../../utility/axios';

function Verify() {

  const token = useSelector((state) => state.auth.token)

  const [dataTable, setDataTable] = useState([])
  const [deps, setDeps] = useState(0)
  const [date, setDate] = useState({
    month: moment().month() + 1,
    year: moment().year()
  })

  const onChange = (date, dateString) => {
    setDate({
      month : moment(dateString).month() + 1,
      year : moment(dateString).year()
    })
  };

  const getDataVerify = () => {
    GetverifyHrd(date.month, date.year, token)
    .then(res => setDataTable(res.data.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getDataVerify()
  },[date, deps])

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
      width: 80,
      dataIndex: 'no',
      key: 'no',
      fixed: 'left',
      render: (e,data,index) => <b>{index + 1}</b>
    },
    {
      title: 'Nik',
      width: 150,
      dataIndex: 'nik',
      key: 'nik',
      fixed: 'left',
    },
    {
      title: 'Name',
      width: 150,
      fixed: 'left',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Address',
      // width: 400,
      dataIndex: 'address',
      key: '2',
    },
    {
      title: 'Salary',
      // width: 130,
      dataIndex: 'total_salary',
      key: 'total_salary',
      render: (e,data) => <>{costing(data.total_salary)}</>
    },
    {
      title: 'Bank',
      // width: 400,
      dataIndex: 'bank_name',
      key: '3',
    },
    {
      title: 'Nomor Rekening',
      // width: 400,
      dataIndex: 'norek',
      key: '4',
    },
    {
      title: 'Date',
      // width: 100,
      dataIndex: 'date_paid',
      key: 'date_paid',
      render: (e,data) => <>{(data.date_paid)?.slice(0,10) ?? '-' }</>
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: (e) => <div className='d-flex flex-row gap-2'><Button type='primary' onClick={() => handleApprovOrCancel(e.id_penggajian, 0)}>Apporve</Button><Button onClick={() => handleApprovOrCancel(e.id_penggajian, 1)} danger>Cancel</Button></div>,
    },
  ];


  // Handle approve / cancel
  const handleApprovOrCancel = async (id, boolean) => {
    try {
      const body = {
        id: id,
        flag: String(boolean),
      }
      const result = await verifyHrd(body, token)
      setDeps(Math.random() * 10000000000000)
      message.success(`income successfully ${id == '0' ? 'Approve' : 'Cancelled'}`)
    } catch (error) {
      console.log(error)
      message.error('Internal Server Error')
    }
  }

  


  


  return (
    <>
      <Space direction="horizontal" className='mb-4'>
        <DatePicker onChange={onChange} defaultValue={dayjs()} picker="month" />
        <Typography level={4}>Filter by date</Typography>
      </Space>
      
      <Table
        columns={columns}
        dataSource={dataTable}
        scroll={{
          x: 1600,
          y: 300
        }}
      />
    </>
  )
}

export default Verify