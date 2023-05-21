import React from 'react'
import { DatePicker, Space, Tag } from 'antd';
import css from '../../style/admin/DetailKaryawan.module.css'
import moment from 'moment';


function Tb_DetailPenggajian() {
  const onChange = (date, dateString) => {
    // console.log("date",date);
    // console.log("dateString",moment(dateString).month() + 1);
  };
  return (
    <>
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
              <th scope='col' className='text-center'>No</th>
              <th scope='col'>Nama</th>
              <th scope='col'>Jabatan</th>
              <th scope='col'>Lembur</th>
              <th scope='col'>Salary</th>
              <th className='text-center' scope='col'>Status</th>
              <th scope='col'>Description</th>
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
                <td><button>View</button></td>
              </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Tb_DetailPenggajian