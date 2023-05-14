import React from "react";
import { useParams } from "react-router";


import Jelly from '../../assets/jelly.png'
import user_image from '../../assets/user_image.jpg'
import css from '../../style/admin/DetailKaryawan.module.css'
import Title from "../../components/Title"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Tables from "../../components/table/Tb_PenggajianAdmin"


function DetailKaryawan() {
  const {idkaryawan} = useParams()


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
                {['Nama', 'Email', 'Jabatan', 'Nomor Telpon', 'Umur', 'Salary', 'Jam Kerja'].map((e, index) => (
                  // <div className="" key={index}>
                    <p>{e}</p>
                  // </div>
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

      <Tables />

        <br />
        <br />

      <Footer /> 
    </>
  );
}

export default DetailKaryawan;
