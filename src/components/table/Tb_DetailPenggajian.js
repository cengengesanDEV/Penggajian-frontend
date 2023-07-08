import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Space, Tag } from 'antd';
import css from '../../style/admin/DetailKaryawan.module.css'
import moment from 'moment';
import { GetkaryawanByIDPenggajian, getALLPenggajianAdmin } from '../../utility/axios'
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function Tb_DetailPenggajian(props) {

  const token = useSelector((state) => state.auth.token)

  const [dataTable, setDataTable] = useState([])

  const [date, setDate] = useState({
    month: moment().month() + 1,
    year: moment().year()
  })

  const onChange = (date, dateString) => {
    setDate({
      month : moment(dateString).month() + 1,
      year : moment(dateString).year()
    })
  };

  const getALLData = () => {
    getALLPenggajianAdmin(date.month, date.year, token)
    .then(res => {
      // console.log("sdasdqw", res.data.data)
      setDataTable(res.data.data)
    })
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    getALLData()
  },[date, props.flag])


  const handleView = async (id) => {
    try {
      const result = await GetkaryawanByIDPenggajian(id, date.month, date.year, token)
      window.scrollTo(0, 0)
      props.data({...result.data.data, date:date})
    } catch (error) {
      console.log(error)
    }
  }
  
  const costing = (price) => {
    return (
      "Rp " +
      parseFloat(price)
          .toFixed()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
  };

  return (
    <>
      <div className="container px-5'" style={{height:'500px', overflowY: 'scroll'}}>
        <div className={`sticky-top bg-dark ${css.search} `}>
          <p className={css.title_search}>Filter : </p>
           <Space direction="vertical">
            <DatePicker onChange={onChange} defaultValue={dayjs()} picker="month" />
          </Space>
          <p className={css.desc_search}>Please choose your date if you want to filter data</p>
        </div>
        <hr />
        <table className={`table table-responsive`} >
          <thead className={`text-white bg-dark  ${css.table_head}`}>
            <tr className="">
              <th scope='col' className='text-center'>No</th>
              <th scope='col'>NIK</th>
              <th scope='col'>Nama</th>
              <th scope='col'>Position</th>
              <th scope='col'>Overtime Salary</th>
              <th scope='col'>Basic Salary</th>
              <th className='text-center' scope='col'>Status</th>
              <th className='text-center' scope='col'>Action</th> 
            </tr>
          </thead>
          <tbody className={`table-group-divider ${css.table_body}`}>
              {dataTable?.map((e,i) => 
                (
                <tr key={i}>
                  <th scope='row'className="text-center">{i+1}</th>
                  <td>{e.nik}</td>
                  <td>{e.fullname}</td>
                  <td>{e.position}</td>
                  <td>{e.overtime_salary == null ? costing(0) :costing(e.overtime_salary)}</td>
                  <td>{e.basic_salary == null ? costing(0) : costing(e.basic_salary)}</td>
                  <td className='text-center'><Tag color={e.penggajian.status === 'belum diverifikasi' ? "red" : e.penggajian.status === 'terverifikasi' ? 'green' : 'warning'} >{e.penggajian.status}</Tag></td>
                  <td className='text-center'><Button disabled={e.penggajian.status === 'belum diverifikasi' ? false : true} type='primary' onClick={() => handleView(e.id)}>View Data</Button></td>
                </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Tb_DetailPenggajian