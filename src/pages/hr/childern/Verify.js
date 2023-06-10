import { Button, Table } from 'antd';
import React from 'react'

function Verify() {

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
      dataIndex: 'salary',
      key: '3',
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 250,
      render: () => <div className='d-flex flex-row gap-2'><Button type='primary'>Apporve</Button><Button  danger>Cancel</Button></div>,
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
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1600,
          y: 300
        }}
      />
    </>
  )
}

export default Verify