import { Button, DatePicker, Descriptions, Input, Select, Space, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { GetAllKaryawan, GetDetailKaryawan, GetInformation } from '../../../utility/axios'
import css from "../../../style/components/TableKaryawanAdmin.module.css"
import moment from 'moment'
import { useSelector } from 'react-redux'
import writeXlsxFile from 'write-excel-file'
import dayjs from 'dayjs'

function Laporan() {

  const token = useSelector((state)=> state.auth.token)

  const [dataSelect, setDataselect] = useState([])
  const [datatable, setDatatable] = useState({})
  const [div, setDiv] = useState({
    CEO:0,
    HRD:0,
    DEVELOPER:0
  })
  const [idkaryawan, setIdkaryawan] = useState(0)
  const [loading, setLoading] = useState(false)
  const [tanggal, setTanggal] = useState({
    month: moment().month() + 1, 
    year:moment().year()
  })
  const [error, setError] = useState(false)
  const [reportDownload, setReportDownload] = useState([])
  const [filename, setFilename] = useState('')


  // untuk set pas di select menampilkan semua data karyawan
  useEffect(() => {
    GetAllKaryawan('', token)
    .then((res) => {setDataselect(res.data.data)})
    .catch((err) => {console.log(err)})
  },[idkaryawan])


  // untuk set data untuk di download
  useEffect(() => {
    GetDetailKaryawan(idkaryawan,tanggal.month,tanggal.year, token)
    .then((res) => {setReportDownload(res.data.data.data_absent)})
    .catch((err) => {console.log(err)})
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


  const schema = [
    // Column #1
    {
      column: 'no',
      type: Number,
      value: student => student.no
    },
    // Column #2
    {
      column: 'Clock-in',
      type: String,
      value: student => student.clockin
    },
    // Column #3
    {
      column: 'Clock-out',
      type: String,
      value: student => student.clockout
    },
    // Column #4
    {
      column: 'Date',
      type: String,
      value: student => student.date
    },
    {
      column: 'Status',
      type: String,
      value: student => student.status
    },
    // Column #5
    {
      column: 'Description',
      type: String,
      value: student => student.description
    }
  ]
  

  const excel = async () => {
    setLoading(true)
    if(!idkaryawan || !tanggal.month || !tanggal.year) return (setError(true),setLoading(false), message.error("please input select account"))
    if(!filename) return (setError(true),setLoading(false), message.error("please input filename to download"))
    setError(false)
    const objects = []
    if(reportDownload.length === 0) return (setError(true),setLoading(false), message.error("This month there is no attendance report"))
    reportDownload.forEach((e, index) => {
      const newData = {
        no: index + 1,
        clockin: e.clockin,
        clockout: e.clockout,
        date: e.date,
        status:e.status,
        description: e.description === "" || e.description === null ? "-" : e.description,
      };
      objects.push(newData);
    });
    await writeXlsxFile(objects, {
      schema,
      fileName: `${filename}.xlsx`
    })
    message.success("Success downloading")
    setFilename("")
    setLoading(false)
  }
  
  useEffect(() => {
    GetInformation()
    .then(res => {
      const HRD = res.data.data.find((e) => e.division_name === 'HRD').users_count ?? 0
      const CEO = res.data.data.find((e) => e.division_name === 'CEO').users_count ?? 0
      const DEVELOPER = res.data.data.find((e) => e.division_name === 'DEVELOPER').users_count ?? 0
      setDiv({
        CEO:CEO,
        HRD:HRD,
        DEVELOPER:DEVELOPER
      })
    })
    .catch(err => console.log(err))
  }, [])

  


  
  
  


  return (
    <>
      <Descriptions title="Semua data karyawan">
        <Descriptions.Item label="Data karyawan">{Number(div.CEO) + Number(div.DEVELOPER) + Number(div.HRD)} People</Descriptions.Item>
        <Descriptions.Item label="">{}</Descriptions.Item>
        <Descriptions.Item label="">{}</Descriptions.Item>
        <Descriptions.Item label="CEO">{div.CEO} People</Descriptions.Item>
        <Descriptions.Item label="HRD">{div.HRD} People</Descriptions.Item>
        <Descriptions.Item label="Developer">{div.DEVELOPER} People</Descriptions.Item>
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
        allowClear={true}
        placeholder="Select Account"
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
      />
      <DatePicker defaultValue={dayjs()} onChange={onChange} allowClear={false} picker="month" />
      <Input value={filename} onChange={(e) => setFilename(e.target.value)} placeholder={'select file name to download'} />
      </Space>
        <br />
        <br />
        <p className={error ? `text-danger` : `text-success`}>{error ? "Please select account before you download this document !!!" : ""}</p>
        <Button loading={loading} type='primary' onClick={excel}>Download Excel</Button>
    </>
  )
}

export default Laporan