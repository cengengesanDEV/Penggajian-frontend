import React, { useEffect, useState } from "react";

import css from "../style/components/TableKaryawanAdmin.module.css"
import axios from "axios";

function Tb_KaryawanAdmin(props) {
  
  const [data, setData] = useState([])
  
  
  let array = [
    {NIK:"1234567890123123",nama:'mark',jabatan:'staff',alamat:'priuuuk', id:3},
    {NIK:"1234567890",nama:'mark',jabatan:'administrasi',alamat:'Jl. Pasopati Blok A no/70 Rt 002 Rw 0000000001'},
    {NIK:"1234567890",nama:'mark',jabatan:'staff',alamat:'priuuuk'},
    {NIK:"1234567890",nama:'mark',jabatan:'staff',alamat:'priuuuk'},
    {NIK:"1234567890",nama:'mark',jabatan:'staff',alamat:'priuuuk'},
    {NIK:"1234567890",nama:'mark',jabatan:'staff',alamat:'priuuuk'},
    {NIK:"1234567890",nama:'mark',jabatan:'staff',alamat:'priuuuk'},
    {NIK:"1234567890",nama:'mark',jabatan:'staff',alamat:'priuuuk'},
    {NIK:"1234567890",nama:'mark',jabatan:'staff',alamat:'priuuuk'},
    {NIK:"1234567890",nama:'mark',jabatan:'staff',alamat:'priuuuk'},
    {NIK:"1234567890",nama:'mark',jabatan:'staff',alamat:'priuuuk'},
    {NIK:"1234567890",nama:'mark',jabatan:'staff',alamat:'priuuuk'},
    {NIK:"1234567890",nama:'mark',jabatan:'staff',alamat:'priuuuk'},
    {NIK:"1234567890",nama:'mark',jabatan:'staff',alamat:'priuuuk'},
  ]




  const Linkto = (to, titlename) => {
    props.navigation(to,titlename);
  };


  useEffect(()=> {
    axios.get('https://penggajian-be.vercel.app/api/users/all-karyawan',{
      headers:{
        'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImZ1bGxuYW1lIjoiYWhtYWRQZXJtYW5hIiwicm9sZSI6InVzZXIiLCJqdGkiOiJTQlFWQ09OOHJDIiwiaWF0IjoxNjgyNzg2ODE1LCJleHAiOjE2ODI4NzMyMTUsImlzcyI6Imlzc3VlciJ9.BghuSXrqNso9Bg1WCsS1DY_4mWEGuz0PzmfAblCADCI'
      }
    })
    .then((res)=>{
      console.log(res.data)
      setData(res.data.data)
    })
    .catch((err)=> {
      console.log(err)
    })
  }, [])

  return (
    <>
      <div className=' w-100 px-5' style={{height:'500px', 'overflow-y': 'scroll','overflow-x': 'hidden'}}>
        <div className={`sticky-top ${css.search} `}>
          <p className={css.title_search}>Search :</p>
          <input type="search" name="" id="" className={css.input_search} />
          <p className={css.desc_search}>find all the employee data you want to find.</p>
        </div>
        <hr style={{color:'black'}} />
        <table className={`table table-responsive`} >
          <thead className={`text-white  ${css.table_head}`}>
            <tr className="">
              <th scope='col'>No</th>
              <th scope='col'>NIK</th>
              <th scope='col'>Nama</th>
              <th scope='col'>Jabatan</th>
              <th scope='col'>Alamat</th>
              <th scope='col' className=" text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className={`table-group-divider ${css.table_body}`}>
            {data.map((e, index) => (
              <tr key={index}>
                <th scope='row'className=" text-center">{index + 1}</th>
                <td style={{ width: "100px" }}>{e.id?.length  > 12 ? `${e.id?.slice(0,12)}...` : e.id}</td>
                <td style={{ width: "200px" }}>{e.fullname?.length  > 35 ? `${e.fullname?.slice(0,35)}...` : e.fullname}</td>
                <td  style={{ width: "100px" }}>{e.jabatan?.length  > 12 ? `${e.jabatan?.slice(0,12)}...` : e.jabatan}</td>
                <td style={{ width: "200px" }}>{e.alamat?.length  > 45 ? `${e.alamat?.slice(0,45)}...` : e.alamat}</td>
                {/* <td style={{ width: "100px" }}>{e.NIK?.length  > 12 ? `${e.NIK?.slice(0,12)}...` : e.NIK}</td>
                <td style={{ width: "200px" }}>{e.nama?.length  > 35 ? `${e.nama?.slice(0,35)}...` : e.nama}</td>
                <td  style={{ width: "100px" }}>{e.jabatan?.length  > 12 ? `${e.jabatan?.slice(0,12)}...` : e.jabatan}</td>
                <td style={{ width: "200px" }}>{e.alamat?.length  > 45 ? `${e.alamat?.slice(0,45)}...` : e.alamat}</td> */}
                <td className=" text-center">
                  <button className={`${css.detail_button}`} onClick={() => Linkto('admin_karyawan_detail', 'karyawan_detail', e.id)}>Detail</button>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Tb_KaryawanAdmin;
