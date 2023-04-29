import React from "react";

import Jelly from '../../assets/jelly.png'
import user_image from '../../assets/user_image.jpg'
import css from '../../style/admin/DetailKaryawan.module.css'
import { useParams } from "react-router";


function DetailKaryawan() {
  const {idkaryawan} = useParams()
  console.log(idkaryawan)

  return (
    <>
      <div className='container-fluid bg-dark'>
        <p>-</p>
      </div>


      <div className={`container`}>
        <div className={`row d-flex flex-row`}>
          <div className={`col-lg-4 ${css.container_image} `}>
            {/* <img src={Jelly} alt="" className={css.image} /> */}
            <img src={user_image} alt="" className={css.image_user} />
            <p>asd</p>
          </div>
          <div className="col-lg-4">
            <div className="row">
              <div className="col-lg-2">
                <p>nama</p>
              </div>
              <div className="col-lg-1">
                <p>:</p>
              </div>
              <div className="col-lg-9">
                <p>najkshdjkhaskdjhkajshdh ashdjkhaksdhkjas ama</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <p>123</p>
          </div>
        </div>
      </div>
        
    </>
  );
}

export default DetailKaryawan;
