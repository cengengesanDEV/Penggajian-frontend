import { Button, DatePicker, Descriptions, Input, Select, Space, Typography, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { GetAllKaryawan, GetDetailKaryawan, GetInformation, PdfAdmin } from '../../../utility/axios'
import css from "../../../style/components/TableKaryawanAdmin.module.css"
import moment from 'moment'
import { useSelector } from 'react-redux'
import writeXlsxFile from 'write-excel-file'
import dayjs from 'dayjs'
import PdfDownload from '../../../components/PdfDownload'

function Laporan() {

  const token = useSelector((state)=> state.auth.token)

  const { Title } = Typography
  const [dataSelect, setDataselect] = useState([])
  const [datatable, setDatatable] = useState({})
  const [div, setDiv] = useState({})
  const [idkaryawan, setIdkaryawan] = useState(0)
  const [idkaryawanpdf, setIdkaryawanpdf] = useState(0)
  const [loading, setLoading] = useState(false)
  const [tanggal, setTanggal] = useState({
    month: moment().month() + 1, 
    year:moment().year()
  })
  const [tanggalpdf, setTanggalpdf] = useState({
    month: moment().month() + 1, 
    year:moment().year()
  })
  const [error, setError] = useState(false)
  const [reportDownload, setReportDownload] = useState([])
  const [filename, setFilename] = useState('')
  const [filenamepdf, setFilenamepdf] = useState('')
  const [dataPDF, setDataPDF] = useState(null)


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

  const handleChangepdf = (value) => {
    // console.log(`selected ${value}`);
    setIdkaryawanpdf(value)
    getData(value,tanggal.month,tanggal.year)
  };
  
  const onChangepdf = (_, dateString) => {
    setTanggal({month: moment(dateString).month() + 1, year:moment(dateString).year()})
    getData(idkaryawanpdf, moment(dateString).month() + 1, moment(dateString).year())
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
  
  // useEffect(() => {
  //   GetInformation()
  //   .then(res => {
  //     console.log(res.data.data, "aljshdjahsjdh");
  //     // let HRD = res.data.data.find((e) => e.division_name === 'HRD').users_count ?? 0
  //     // let ADMINISTRASI = res.data.data.find((e) => e.division_name === 'ADMINISTRASI').users_count ?? 0
  //     // let KARYAWAN = res.data.data.find((e) => e.division_name === 'KARYAWAN').users_count ?? 0
  //     // console.log(HRD, ADMINISTRASI, KARYAWAN, "aljshdjahsjdh")
  //     return setDiv({
  //       KARYAWAN:Number(res.data.data[0].users_count) ?? 0,
  //       HRD: Number(res.data.data[1].users_count) ?? 0,
  //       ADMINISTRASI:Number(res.data.data[2].users_count) ?? 0
  //     })
  //   })
  //   .catch(err => console.log(err))
  // }, [])

  // console.log(div,'aljshdjahsjdh')

  

  const getData = (id, month, year) => {

    PdfAdmin(id, month, year, token)
    .then((res) => {
      // message.success("You can download report salary"); 
      console.log("testlaporan",res.data.data)

      setDataPDF(res.data.data)
      if(res.data.data == null) return (message.error('Employee have not been paid'))
    })
    .catch((err) => console.log(err))
  }


  
  
  


  return (
    <>
      {/* <Descriptions title="Semua data karyawan">
        <Descriptions.Item label="Data karyawan">{Number(div.ADMINISTRASI ?? 0) + Number(div.KARYAWAN ?? 0) + Number(div.HRD ?? 0)} People</Descriptions.Item>
        <Descriptions.Item label="">{}</Descriptions.Item>
        <Descriptions.Item label="">{}</Descriptions.Item>
        <Descriptions.Item label="ADMINISTRASI">{div.ADMINISTRASI ?? 0} People</Descriptions.Item>
        <Descriptions.Item label="HRD">{div.HRD ?? 0} People</Descriptions.Item>
        <Descriptions.Item label="KARYAWAN">{div.KARYAWAN ?? 0} People</Descriptions.Item>
      </Descriptions> */}
      <p>Select account karyawan if you want to download document excel or pdf about that <b>(the default date filter is the current time)</b> </p>
      <hr />
      
      {/* Excel */}
      <Title level={5}>Download Report Absensi</Title>
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


      <br />
      <br />
      <br />

      {/* PDF */}
      <Title level={5}>Download Report Salary</Title>
      <Space wrap>
        <Select
          defaultValue=""
          style={{
            width: 200,
          }}
          onChange={handleChangepdf}
          options={options(dataSelect)}
          onSearch={onSearch}
          placeholder="Select Account"
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
        <DatePicker defaultValue={dayjs()} onChange={onChangepdf} picker="month" disabled={!idkaryawanpdf} />
        <Input value={filenamepdf} onChange={(e) => setFilenamepdf(e.target.value)} placeholder={'select file name to download'} />
      </Space>

        <PdfDownload fileName={filenamepdf} date={tanggalpdf} idkaryawan={idkaryawanpdf} data={dataPDF} />
      
    </>
  )
}

export default Laporan