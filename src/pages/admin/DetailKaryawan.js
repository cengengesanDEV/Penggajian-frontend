import React, { useEffect, useState } from "react";
import { useParams } from "react-router";


import Jelly from '../../assets/jelly.png'
import user_image from '../../assets/user_image.jpg'
import css from '../../style/admin/DetailKaryawan.module.css'
import Title from "../../components/Title"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Tables from "../../components/table/Tb_PenggajianAdmin"
import { GetDetailKaryawan } from '../../utility/axios'
import moment from "moment";
import { Descriptions } from "antd";
import { useSelector } from "react-redux";


function DetailKaryawan() {
  const {idkaryawan} = useParams()
  const token = useSelector((state) => state.auth.token)

  const [profile, setProfile] = useState({})
  const [absent, setAbsent] = useState([])
  const [filter, setFilter] = useState({
    month: moment().month() + 1, 
    year:moment().year()
  })


  useEffect(() => {
    GetDetailKaryawan(idkaryawan, filter.month, filter.year, token)
    .then((res) => {
      console.log("profil", res.data)
      setProfile(res.data.data)
      setAbsent(res.data.data.data_absent)
    })
    .catch((err) => console.log("profilerr", err))
  },[filter])




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
            <img src={Jelly} alt="Connection_Lost" className={`${css.background_body}`} />
            <img src={profile.image} alt="Connection_Lost" className={css.image_user} />
          </div>

          {/* content center */}
          <div className="col-lg-8">
            <Descriptions title="Detail Karyawan" layout="vertical">
              <Descriptions.Item label="Name">{profile.fullname}</Descriptions.Item>
              <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
              <Descriptions.Item label="NIK">{profile.nik}</Descriptions.Item>
              <Descriptions.Item label="Phone Number">{profile.phone_number}</Descriptions.Item>
              <Descriptions.Item label="Birth Date">{moment(profile.birth_date).format('DD-MM-YYYY')}</Descriptions.Item>
              <Descriptions.Item label="Working Hours">08:00 - 15:00</Descriptions.Item>
              <Descriptions.Item label="Position">{profile.position}</Descriptions.Item>
              <Descriptions.Item label="Address">{profile.address}</Descriptions.Item>
            </Descriptions>
            </div>
          </div>

    
        
      </div>

      <br />
      <br />

      <Tables ChangeFilter={(value)=> setFilter(value)} keterangan={profile} data={absent}/>

        <br />
        <br />

      <Footer /> 
    </>
  );
}

export default DetailKaryawan;
