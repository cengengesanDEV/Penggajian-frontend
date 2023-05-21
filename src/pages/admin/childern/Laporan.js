import { DatePicker, Descriptions, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { GetAllKaryawan, GetDetailKaryawan } from '../../../utility/axios'
import css from "../../../style/components/TableKaryawanAdmin.module.css"
import moment from 'moment'
import { useSelector } from 'react-redux'

function Laporan() {

  const token = useSelector((state)=> state.auth.token)

  const [dataSelect, setDataselect] = useState([])
  const [datatable, setDatatable] = useState([])
  const [idkaryawan, setIdkaryawan] = useState(0)
  const [tanggal, setTanggal] = useState({
    month: moment().month() + 1, 
    year:moment().year()
  })
  const [error, setError] = useState(false)

  useEffect(() => {
    GetAllKaryawan('', token)
    .then((res) => {setDataselect(res.data.data)})
    .catch((err) => console.log(err))
  },[idkaryawan])

  useEffect(() => {
    GetDetailKaryawan(idkaryawan,tanggal.month,tanggal.year, token)
    .then((res) => {console.log(res.data)})
    .catch((err) => console.log(err))
  },[idkaryawan, tanggal])


  const options = (data) => {
    let arr = []
    data.map((e,index) => (
      arr.push({label:`${index + 1}. ${e.fullname}`, value:e.id})
    ))
    return arr
  }


  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    setIdkaryawan(value)
  };

  const onChange = (_, dateString) => {
    setTanggal({month: moment(dateString).month() + 1, year:moment(dateString).year()})
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
  

  const excel = () => {
    if(!idkaryawan || !tanggal.month || !tanggal.year) return setError(true)
    setError(false)
    console.log("here")
  }



  return (
    <>
      <Descriptions title="Semua data karyawan">
        <Descriptions.Item label="Data karyawan">123 orang</Descriptions.Item>
        <Descriptions.Item label="Karyawan/CEO">2 orang</Descriptions.Item>
        <Descriptions.Item label="Karyawan/HRD">5 orang</Descriptions.Item>
        <Descriptions.Item label="Karyawan/Produksi">12 orang</Descriptions.Item>
        <Descriptions.Item label="Karyawan/Administrasi">4 orang</Descriptions.Item>        
      </Descriptions>

      <br />
      <br />
      <br />
      <p>Select account karyawan if you want to download document excel about that <b>(the default date filter is the current time)</b> </p>
      <Space wrap>
        <Select
        defaultValue=""
        style={{
          width: 200,
        }}
        onChange={handleChange}
        options={options(dataSelect)}
        onSearch={onSearch}
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
      />
      <DatePicker onChange={onChange} allowClear={false} picker="month" />
      </Space>
        <br />
        <br />
        <p className={error ? `text-danger` : `text-success`}>{error ? "Please select account before you download this document !!!" : ""}</p>
        <button onClick={excel}>Download Excel</button>
    </>
  )
}

export default Laporan