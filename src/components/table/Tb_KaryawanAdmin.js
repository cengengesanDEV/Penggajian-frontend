import React, { useEffect, useState } from "react";

import css from "../../style/components/TableKaryawanAdmin.module.css"
import axios from "axios";
import { useNavigate } from "react-router";
import { Skeleton } from "antd";
import { GetAllKaryawan } from "../../utility/axios";
import { useSelector } from "react-redux";

function Tb_KaryawanAdmin() {
  
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  

  const getAPI = () => {
    // setLoading(true)
    GetAllKaryawan(search, token)
    .then((res)=>{
      // console.log(res.data)
      setData(res.data.data)
    })
    .catch((err)=> {
      console.log(err)
    })
    // .finally(()=>
    //   setTimeout(() => {
    //     setLoading(false)
    //   }, 1000)
    // )
  }


  useEffect(()=> {
    getAPI()
  }, [search])

  


  return (
    <>
    <Skeleton loading={loading} paragraph={{ rows: 5 }} className="container">
        <div className=' w-100 px-5' style={{height:'500px', overflowY: 'scroll'}}>
          <div className={`sticky-top ${css.search} `}>
            <p className={css.title_search}>Search :</p>
            <input type="search" onChange={(e) => setSearch(e.target.value)} className={css.input_search} />
            <p className={css.desc_search}>Can only search for employee names.</p>
          </div>
          <hr style={{color:'black'}} />
          <table className={`table table-responsive`} >
            <thead className={`text-white  ${css.table_head}`}>
              <tr className="">               
                <th className="text-center" scope='col'>No</th>
                <th scope='col'>NIK</th>
                <th scope='col'>Name</th>
                <th scope='col'>Position</th>
                <th scope='col'>Address</th>
                <th scope='col' className=" text-center">Action</th>
              </tr>
            </thead>
            <tbody className={`table-group-divider ${css.table_body}`}>
              {data.map((e, index) => (
                <tr key={index}>
                  <th scope='row'className=" text-center">{index + 1}</th>
                  <td style={{ width: "100px" }}>{e.id?.length  > 12 ? `${e.id?.slice(0,12)}...` : e.id}</td>
                  <td style={{ width: "200px" }}>{e.fullname?.length  > 35 ? `${e.fullname?.slice(0,35)}...` : e.fullname}</td>
                  <td  style={{ width: "100px" }}>{e.position?.length  > 12 ? `${e.position?.slice(0,12)}...` : e.position}</td>
                  <td style={{ width: "200px" }}>{e.address?.length  > 45 ? `${e.address?.slice(0,45)}...` : e.address}</td>
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
