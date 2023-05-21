import React, { useEffect, useState } from 'react'
import { DatePicker, Space } from 'antd';
import css from '../../style/admin/DetailKaryawan.module.css'
import moment from "moment/moment";


function Tb_PenggajianAdmin({ChangeFilter,data, keterangan}) {

  const onChange = (_, dateString) => {
    ChangeFilter({month: moment(dateString).month() + 1, year:moment(dateString).year()})
  };

  return (
    <>
    <div className="container px-5'" style={{height:'500px', overflowY: 'scroll'}}>
        <div className={`sticky-top bg-dark ${css.search} `}>
          <p className={css.title_search}>Filter : </p>
           <Space direction="vertical">
            <DatePicker onChange={onChange} allowClear={false} picker="month" />
          </Space>
          <p className={css.desc_search}>{keterangan?.jumlah_izin === 0 ? `Izin = 0` : `Izin = ${keterangan?.jumlah_izin}`} || {keterangan?.jumlah_masuk === 0 ? `Masuk = 0` : `Masuk = ${keterangan?.jumlah_masuk}`} || {keterangan?.jumblah_sakit === 0 ? `Sakit = 0` : `Sakit = ${keterangan?.jumblah_sakit}`}</p>
        </div>
        <hr />
        <table className={`table table-responsive`} >
          <thead className={`text-white bg-dark  ${css.table_head}`}>
            <tr className="">
              <th scope='col'>No</th>
              <th scope='col'>Clock-In</th>
              <th scope='col'>Clock-Out</th>
              <th scope='col'>Date</th>
              <th scope='col'>Status</th>
              <th scope='col'>Description</th>
            </tr>
          </thead>
          <tbody className={`table-group-divider ${css.table_body}`}>
              {data?.map((e,index) => (
                <tr key={index}>
                  <th scope='row'className="text-center">{index + 1}</th>
                  <td>{e.clockin}</td>
                  <td>{e.clockout}</td>
                  <td>{e.date}</td>
                  <td>{e.status}</td>
                  <td>{e.description === null ? '-' : e.description}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Tb_PenggajianAdmin