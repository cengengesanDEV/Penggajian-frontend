import React from 'react'
import { DatePicker, Space } from 'antd';
import css from '../../style/admin/DetailKaryawan.module.css'
import moment from "moment/moment";

function Tb_PenggajianAdmin() {

  const onChange = (date, dateString) => {
    console.log("date",date);
    console.log("dateString",moment(dateString).month() + 1);
  };

  return (
    <>
    <div className="container px-5'" style={{height:'500px', overflowY: 'scroll',overflowX: 'hidden'}}>
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
              <th scope='col'>No</th>
              <th scope='col'>Clock-In</th>
              <th scope='col'>Clock-Out</th>
              <th scope='col'>Date</th>
              <th scope='col'>Status</th>
              <th scope='col'>Description</th>
            </tr>
          </thead>
          <tbody className={`table-group-divider ${css.table_body}`}>
              <tr>
                <th scope='row'className="text-center">1</th>
                <td>10:10</td>
                <td>10:10</td>
                <td>10-10-10</td>
                <td>Izin</td>
                <td>Pulang kampung</td>
              </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Tb_PenggajianAdmin