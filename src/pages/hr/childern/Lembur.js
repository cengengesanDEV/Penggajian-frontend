import { Button, Col, DatePicker, Descriptions, Input, Row, Select, Space, Tag, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react'
import css from '../../../style/admin/DetailKaryawan.module.css'
import { CreateLemburan, GetDetailKaryawan, GetLemburan, getAllSelect, karyawanDetailID } from '../../../utility/axios';
import { useSelector } from 'react-redux';
import moment from 'moment';
import dayjs from 'dayjs';

function Lembur() {

  const { Title } = Typography;

  const token = useSelector((state) => state.auth.token)
  const [dataSelect, setDataselect] = useState([])
  const [dataDetail, setDataDetail] = useState({})
  const [idkaryawan, setIdkaryawan] = useState(null)
  const [datainput, setDatainput] = useState({})
  const [date, setDate] = useState({})
  const [search, setSearch] = useState(moment().format('YYYY-MM-DD'))
  const [tables, setTables] = useState([])

  console.log(search)
  // useEffect(()=> {
  //   setDataselect([])
  //   setIdKaryawan(null)
  // },[refresh])

  const getkaryawanAPI = () => {
    getAllSelect()
    .then((res) => setDataselect(res.data.data))
    .catch((err) => console.log(err))
  }


  useEffect(() => {
    getkaryawanAPI()
  }, [])

  const selectKaryawan = () => {
    let arr = []
    let i = 0
    dataSelect.map((e,index) => {
      if(e.role === 'hrd'){
        return
      }else{
        i += 1
        arr.push({label:`${i}. ${e.fullname}`, value:e.id})
      }
    })
    return arr
  }


  const onChangeDetail = (value) => {
    karyawanDetailID(value)
    .then((res) => {setIdkaryawan(value);setDataDetail(res.data.data)})
    .catch((err) => console.log(err))
  }

  const onChangeDatePicker = (values) => {
    console.log({...date, ...values})
    setDate({...date, ...values})
  }

  const onChange = (e) => {
    console.log({...datainput, [e.target.name] : e.target.value})
    setDatainput({...datainput, [e.target.name] : e.target.value})
  }

  const lemburAPI = async () => {
    try {
      // console.log({...datainput, ...date, id_users:idkaryawan})
      if(!idkaryawan || !datainput.desc || !datainput.jam_lembur || !date) return message.error("please correct input again")
      const reqBody = await {...datainput, ...date, id_users:idkaryawan}
      const result = await CreateLemburan(reqBody, token)
      await getTableKaryawanAPI()
      await clearState()
      message.success('Success create overtime')
    } catch (error) {
      console.log(error)
      message.error("maintanance lembur")
    }
  }

  const getTableKaryawanAPI = () => {
    GetLemburan(search,token)
    .then((res) => setTables(res.data.data))
    .catch((err)=> message.error("maintanance lembur"))
  }

  useEffect(() => {
    getTableKaryawanAPI()
  },[search])
  
  const costing = (price) => {
      return (
        "Rp " +
        parseFloat(price)
            .toFixed()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
      );
  };

  const clearState = () => {
    setDataDetail({})
    setIdkaryawan("")
    setDatainput({})
    setDate({})    
    // setSearch(moment().format('YYYY-MM-DD'))
    // setTables([])
  }


  return (
    <>
      <Title level={4}>Add lembur karyawan</Title>
      <hr />
      <Select
        defaultValue=""
        style={{
          width: 200,
        }}        
        value={idkaryawan}
        onChange={onChangeDetail}
        options={selectKaryawan()}
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
      />
      <span className='ps-3'>Role HRD can't get work overtime</span>
      <Row>
        <Col className='pt-3' span={12}>
          <Descriptions title="Detail">
            <Descriptions.Item label="Name">{dataDetail.username ? dataDetail.username : "-" }</Descriptions.Item>
            <Descriptions.Item label="NIK">{dataDetail.nik ? dataDetail.nik : '-'}</Descriptions.Item>
            <Descriptions.Item label="Divisi">{dataDetail.position ? dataDetail.position : '-'}</Descriptions.Item>
            <Descriptions.Item label="Address">{dataDetail.address ? dataDetail.address : '-'}</Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12} className='pt-3'>
          <Title level={5}>Input Data</Title>
          <hr />
          <Row gutter={24}>
            <Col span={12}>
              <p>Jam Lembur / Hours</p>
              <Input placeholder="please insert overwork time / hours" value={datainput.jam_lembur} name='jam_lembur' onChange={onChange} allowClear />
            </Col>
            <Col span={12}>
              <p>Date Overtime</p>
              {/* <Input placeholder="Please insert date overtime" name='address' onChange={onChange} allowClear /> */}
              <DatePicker 
                style={{width:'100%'}} 
                defaultValue={date.date ? dayjs(date.date , 'YYYY-MM-DD') : null} 
                value={date.date ? dayjs(date.date , 'YYYY-MM-DD') : null} 
                format={'YYYY-MM-DD'} 
                onChange={(e,dateString) => onChangeDatePicker({date : moment(dateString).format('YYYY-MM-DD')})} 
              />
            </Col>
          </Row>
          <div className="pt-3">
            <p>Description</p>
            <Input placeholder="If you want add description write this" value={datainput.desc} name='desc' onChange={onChange} allowClear />
          </div>
          <Button className='mt-3' type="primary" onClick={lemburAPI}>Create</Button>
          <Button className='ms-3' danger onClick={clearState}>Clear / Cancel</Button>
        </Col>
      </Row>

        <br />
        <br />
        <br />
      <Title level={4}>View Data lembur</Title>
      <hr />

      <div className="container px-5'" style={{height:'500px', overflowY: 'scroll'}}>
        <div className={`sticky-top bg-dark ${css.search} `}>
          <p className={css.title_search}>Filter : </p>
           <Space direction="vertical">
            <DatePicker onChange={(e, dateString) => {setSearch(moment(dateString).format('YYYY-MM-DD'))}} />
          </Space>
          <p className={css.desc_search}>Please choose your date if you want to filter data</p>
        </div>
        <hr />
        <table className={`table table-responsive`} >
          <thead className={`text-white bg-dark  ${css.table_head}`}>
            <tr className="">
              {/* <div>NO, NAMA, JABATAN, TANGGAL, </div> */}
              <th scope='col' className='text-center'>No</th>
              <th scope='col'>Name</th>
              <th scope='col'>Divisi</th>
              <th className='text-center' scope='col'>Date</th>
              <th className='text-center' scope='col'>Time/hours</th>
              <th className='text-center' scope='col'>Salary</th>
              <th className='text-center' scope='col'>Income</th>
            </tr>
          </thead>
          <tbody className={`table-group-divider ${css.table_body}`}>
              {tables?.map((element,index) => (
                <tr key={index}>
                  <th scope='row'className="text-center">{index+1}</th>
                  <td>{element.fullname ? element.fullname : '-'}</td>
                  <td>{element.position ? element.position : '-'}</td>
                  <td className='text-center'>{element.date ? moment(element.date).format('YYYY-MM-DD') : "-"}</td>
                  <td className='text-center'>{element.jam_lembur ? element.jam_lembur : '-'}/hours</td>
                  <td className='text-center'><Tag color="green" >{element.overtime_salary ? costing(element.overtime_salary) : '-'}</Tag></td>
                  <td className='text-center'><Tag color="green" >{element.jam_lembur && element.overtime_salary ? costing(element.jam_lembur * element.overtime_salary) : '-'}</Tag></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>


    </>
  )
}

export default Lembur