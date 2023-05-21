import React, { useEffect, useState } from 'react'
import { DatePicker, Space, Tag } from 'antd';
import css from '../../style/admin/DetailKaryawan.module.css'
import moment from 'moment';


function Tb_reuse({kunci,dataColumn}) {

  
  // console.log("dataddd", kunci)

  const [tabs, setTabs] = useState([])
  const [columns, setColumns] = useState({})
  // const [style, setStyle] = useState({width:0, lenght:0})

  const onChange = (date, dateString) => {
    console.log("date",date);
    console.log("dateString",moment(dateString).month() + 1);
  };


  useEffect(() => {
    console.log("dataddd", dataColumn)
    switch (kunci) {
      case 'detail':
          setTabs(['nama', 'jabatan', 'lembur', 'salary', 'status', 'deskripsi'])
          setColumns(dataColumn)
          break;

      case 'listkaryawan':
        const longText = [12,25,12,45]
        const width = [100, 200]
        setTabs(['nik', 'nama', 'jabatan', 'alamat', 'aksi'])
        console.log("datamappp", {col:dataColumn, longText, width})
        setColumns({col:dataColumn, longText, width})

    break;
    
      default:
        break;
    }
  },[dataColumn])

  
  return (
    <>
      <div className="container px-5'" style={{height:'500px', overflowY: 'scroll'}}>
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
              <th scope='col' className='text-center'>No</th>
              {/*               
              <th scope='col'>Nama</th>
              <th scope='col'>Jabatan</th>
              <th scope='col'>Lembur</th>
              <th scope='col'>Salary</th> 
              <th scope='col'>Status</th>
              <th scope='col'>Description</th>
              */}
              {tabs.map((e,index) =>{
                return <th scope='col'>{e}</th>
              })}
            </tr>
          </thead>
          <tbody className={`table-group-divider ${css.table_body}`}>
              {/* <tr>
                <th scope='row'className="text-center">1</th>
                <td>Udin</td>
                <td>Staff</td>
                <td>10</td>
                <td>-</td>
                <td><Tag color="red" >Verify</Tag></td>
                <td>-</td>
              </tr> */}
              {columns?.col?.map((e,index) => (
                console.log("mapinge",e)
                  // <tr>
                  //   <th scope='row'className="text-center">{index}</th>
                  //   <td>{e[index]}</td>
                  // </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Tb_reuse