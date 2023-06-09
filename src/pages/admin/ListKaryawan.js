import React, { useEffect, useState } from 'react'

import css from '../../style/admin/Listkaryawan.module.css'
import Tables from '../../components/table/Tb_KaryawanAdmin'
import Navbar from "../../components/Navbar";
import Title from "../../components/Title"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function ListKaryawan() {
  return (
    <>
    <Navbar/>
    <Title title={'List Karyawan'} />
      {/* style */}
      <div className="container-fluid bg-dark">
        <p>-</p>
      </div>

      <div className={`container ${css.main_container} mb-5`}>
        <div className="row d-flex flex-row">

          {/* content left */}
          <div className="col-lg-2">
            <div className={`${css.info_detail}`} >
              <p className={css.title_info}>List Karyawan</p>
              <hr />
              <p className={css.title_info_desc}>Following are the details of employees at PT Dua Saudara Plastik, click on details to see detailed employee information personally.
              <br />
              <br />
              On the details page, you can see employee personal data and you can also view employee attendance and payroll reports.</p>
            </div>
          </div>

          {/* Content right */}
          <div className="col-lg-10 d-flex flex-row">
            <div className='' style={{backgroundColor:'#f7f7f7', width:'2px', borderRadius:'50px'}}></div>
            <Tables />
          </div>
        </div>
        
        
      </div>    
    </>
  )
}

export default ListKaryawan