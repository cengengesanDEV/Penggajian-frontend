import React, { useEffect, useState } from "react";

import css from "../style/components/TableKaryawanAdmin.module.css"
import axios from "axios";
import { useNavigate } from "react-router";
import { Skeleton } from "antd";

function Tb_KaryawanAdmin() {
  
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  


  useEffect(()=> {
    setLoading(true)
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
    .finally(()=>
      setTimeout(() => {
        setLoading(false)
      }, 5000)
    )
  }, [])

  return (
    <>
    <Skeleton loading={loading} paragraph={{ rows: 5 }} className="container">
        <div className=' w-100 px-5' style={{height:'500px', overflowY: 'scroll',overflowX: 'hidden'}}>
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
                  <td className=" text-center">
                    <button className={`${css.detail_button}`} onClick={() => navigate(`/admin/data-karyawan/${e.id}`)}>Detail</button>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      </Skeleton>
    </>
  );
}

export default Tb_KaryawanAdmin;
