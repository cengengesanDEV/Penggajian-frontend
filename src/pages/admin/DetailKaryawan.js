import React from "react";
import { useParams } from "react-router";
import { DatePicker, Space } from 'antd';

import Jelly from '../../assets/jelly.png'
import user_image from '../../assets/user_image.jpg'
import css from '../../style/admin/DetailKaryawan.module.css'
import Title from "../../components/Title"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import moment from "moment/moment";


function DetailKaryawan() {
  const {idkaryawan} = useParams()
  
  const onChange = (date, dateString) => {
    console.log("date",date);
    console.log("dateString",moment(dateString).month() + 1);
  };

  return (
    <>
    <Navbar />
    <Title title={'Detail Karyawan'} />
      <div className='container-fluid bg-dark'>
        <p>-</p>
      </div>


      <div className={`container-fluid`} style={{height:'360px'}}>
        <div className={`row d-flex flex-row container px-5`}>

          {/* content left */}
          <div className={`col-lg-4 ${css.container_image} `}>
            <img src={Jelly} alt="" className={`${css.background_body}`} />
            <img src={user_image} alt="" className={css.image_user} />
          </div>

          {/* content center */}
          <div className="col-lg-5">
            <div className={`row text-start ${css.form_detail}`}>
              <div className="col-lg-4">
                {['Nama', 'Email', 'Jabatan', 'Nomor Telpon', 'Umur', 'Salary', 'Jam Kerja'].map(e => (
                  <p>{e}</p>
                ))}
              </div>
              <div className="col-lg-1">
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
              </div>
              <div className="col-lg-7">
                <p>{idkaryawan}</p>
                <p>najkshdjkhaskdjhkajs</p>
                <p>najkshdjkhaskdjhkajs</p>
                <p>najkshdjkhaskdjhkajs</p>
                <p>najkshdjkhaskdjhkajs</p>
                <p>najkshdjkhaskdjhkajs</p>
                <p>najkshdjkhaskdjhkajs</p>
              </div>
            </div>
          </div>

          {/* content right */}
          <div className="col-lg-3">
            <p>Noted : -</p>
          </div>
        </div>
      </div>

      <br />
      <br />

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

      <br />
      <br />

      <Footer /> 
    </>
  );
}

export default DetailKaryawan;
