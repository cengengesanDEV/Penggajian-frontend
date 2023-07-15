import { Button, Col, DatePicker, Input, InputNumber, Row, Select, Skeleton, Typography, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { GetAllKaryawan, GetAllRole, PatchKaryawanID, getDivision, karyawanDetailID, suspend } from '../../../utility/axios'
import css from "../../../style/components/TableKaryawanAdmin.module.css"
import { useSelector } from 'react-redux'
import moment from 'moment'
import TextArea from 'antd/es/input/TextArea'
import PicDefault from '../../../assets/user_image.jpg'
import dayjs from 'dayjs'


function ViewData() {

  const { Title } = Typography
  const token = useSelector((state) => state.auth.token)

  const [dataTable, setDataTable] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const [data, setData] = useState({})
  const [role, setRole] = useState('')
  const [disable, setDisable] = useState(true)
  const [loadingImage, setLoadingImage] = useState(false)  
  const [loadingSus, setLoadingSus] = useState(false)
  const [imageUrl, setImageUrl] = useState();
  const [preview, setPreview] = useState(PicDefault)
  const [divisi, setDivisi] = useState([])
  const [numbering, setNumbering] = useState({})

  // useEffect(()=>{
  //   console.log("refresh", refresh)
  //   setDataTable([])
  //   setLoading(false)
  //   setSearch('')
  //   setData({})
  //   setDisable(true)
  //   setLoadingImage(false)
  //   setPreview(PicDefault)
  //   setDivisi([])
  //   setNumbering({})
  // },[refresh])
  
  

  const onChange = (e) => {
    // console.log({ ...data, [e.target.name]: e.target.value })
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onChangeNumber = (value) => {
    setNumbering({...numbering, ...value})
  }

  const resetState = () => {
    setData({})
    setNumbering({})
    setPreview(PicDefault)
    setDisable(true)
  }

  const onSearch = (value) => {
    console.log('search:', value);
  };



  const handleImageEdit = (e) => {
    // console.log("qweqwe",URL.createObjectURL(e.target.files[0]))
    setLoadingImage(true)
    if(e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/jpg") {
      setImageUrl(e.target.files[0])
      setPreview(URL.createObjectURL(e.target.files[0]))
      onChangeNumber({image:e.target.files[0]})
      setLoadingImage(false)
      message.success("Success upload picture")
    } else {
      message.error("Upload image png or jpeg")
      setLoadingImage(false)
    }
  }


  const DataRole = () => {
    return [
      {
        value: 'admin',
        label: '1. Admin',
      },
      {
        value: 'hrd',
        label: '2. Hrd',
      },
      {
        value: 'users',
        label: '3. Users',
      },
    ]
  }

  let dataDivisi = () => {
    let arr = []
    divisi.map((e,index) => (
      arr.push({label:`${index + 1}. ${e.position}`, value:e.id})
    ))
    return arr
  }

  useEffect(() => {
    getDivision()
    .then((res) => setDivisi(res.data.data))
    .catch((err)=> console.log(err))
  }, [])

  const getAPI = () => {
    // setLoading(true)
    GetAllRole(search, token)
    .then((res)=>{
      // console.log("allkaryawan",res.data)
      setDataTable(res.data.data)
    })
    .catch((err)=> {
      console.log(err)
    })
  }

  useEffect(()=> {
    getAPI()
  }, [search])

  const patchAPI = () => {
    setLoading(true)
    // console.log( !data.phone_number || !data.address || !numbering.overtime_salary || !numbering.basic_salary || !numbering.id_division || !numbering.role || !numbering.birth_date || !numbering.image || !numbering.norek)
    if(!data.id || !data.bank_name || !data.fullname  || !data.username || !data.email || !data.nik || !data.phone_number || !data.address || !numbering.overtime_salary || !numbering.basic_salary || !numbering.id_division || !numbering.role || !numbering.birth_date || !numbering.image || !numbering.norek) {return (message.error('please correct input form again'), setLoading(false))}
    let body = new FormData()
    data.note = !data.note ? '-' : data.note
    if(numbering.image) body.append('image', numbering.image);
    if(numbering.birth_date) body.append('birth_date', numbering.birth_date)
    if(numbering.role) body.append('role', numbering.role)
    if(numbering.id_division) body.append('id_division', numbering.id_division)
    if(numbering.basic_salary) body.append('basic_salary', numbering.basic_salary)
    if(numbering.overtime_salary) body.append('overtime_salary', numbering.overtime_salary)
    if(numbering.norek) body.append('norek', numbering.norek)
    if(data.fullname) body.append('fullname', data.fullname)
    if(data.username) body.append('username', data.username)
    if(data.email) body.append('email', data.email)
    if(data.bank_name) body.append('bank_name', data.bank_name)
    if(data.nik) body.append('nik', data.nik)
    if(data.phone_number) body.append('phone_number', data.phone_number)
    if(data.address) body.append('address', data.address)
    if(data.note) body.append('note', data.note)
    PatchKaryawanID(data.id, body, token)
    .then((res) => {
      window.scrollTo(0, 0)
      resetState()
      setDisable(true)
      getAPI()
      message.success('Create karyawan success')
    })
    .catch((err) => message.error(err.response.data.msg))
    .finally(() => {setLoading(false)})
  }

  const handleGetKaryawan = async (idKaryawan) => {
    try {
      const result = await karyawanDetailID(idKaryawan)
      setData(result.data.data)
      setNumbering(result.data.data)
      setPreview(result.data.data.image)
      window.scrollTo(0, 0)
      setDisable(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSuspend = (id, statusSuspend) => {
    setLoadingSus(true)
    suspend({id, flags: statusSuspend}, token)
    .then((res) => {message.success(res.data.msg); getAPI()})
    .catch((err) => message.error("internal server error"))
    .finally(() => setLoadingSus(false))
  }

  return (
    <>
      <Title level={4}>Edit Karyawan</Title>
      <hr />
      <Row>
        <Col span={24}>
          {loading ? <Skeleton.Image active={true} /> : <img src={preview} alt="Picture_user" width={100} height={120} />}
          <label style={{color:'white',backgroundColor:`${disable ? 'grey' : '#1677ff'} `, marginLeft:'10px',padding:'5px 10px', borderRadius:'10px', cursor:'pointer'}} htmlFor="image_preview_edit">Click here to upload picture</label>
          <input type="file" disabled={disable} onChange={(e) => handleImageEdit(e)} name="" id="image_preview_edit" style={{display:'none'}} />
        </Col>
      </Row>


        <Row gutter={24}>
          <Col span={8}>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>Fullname</span>
              <Input placeholder="Fullname" value={data.fullname} name='fullname' onChange={onChange} allowClear disabled={disable} />
            </div>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>Username</span>
              <Input placeholder="Username" value={data.username} name='username' onChange={onChange} allowClear disabled={disable} />
            </div>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>Email</span>
              <Input  placeholder="email" value={data.email} name='email' onChange={onChange} allowClear disabled={disable} />
            </div>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>password</span>
              <Input placeholder="Password can be change only users" value={data.password} name='password'  allowClear disabled={true} />
            </div>
          </Col>

          <Col span={8}>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>Nomor induk karyawan (NIK)</span>
              <Input placeholder="nik" value={data.nik} name='nik' onChange={onChange} allowClear disabled={disable} />
            </div>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>Phone Number</span>
              <Input placeholder="Phone number" value={data.phone_number} name='phone_number' onChange={onChange} allowClear disabled={disable} />
            </div>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>Birth Date</span>
              {/* <Input placeholder="birth_date" name='birth_date' onChange={onChange} allowClear /> */}
              <DatePicker format={'YYYY-MM-DD'} value={dayjs(moment(numbering.birth_date).format('YYYY-MM-DD'), 'YYYY-MM-DD')} placeholder={numbering.birth_date ? moment(numbering.birth_date).format('YYYY-MM-DD') : "inset birth date"}  onChange={(e,dateString) => onChangeNumber({birth_date : moment(dateString).format('YYYY/MM/DD')})} disabled={disable} />
            </div>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>Address</span>
              <Input placeholder="address" value={data.address} name='address' onChange={onChange} allowClear disabled={disable} />
            </div>
          </Col>

          <Col span={8}>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>Access Role</span>
              <Select
                defaultValue=""
                style={{
                  width: '100%',
                }}
                disabled={disable}
                value={numbering.role}
                onChange={(values) => onChangeNumber({role:values})}
                options={DataRole()}
                onSearch={onSearch}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </div>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>Position / Divisi</span>
              <Select
                disabled={disable}
                defaultValue=""
                style={{
                  width: '100%',
                }}
                value={numbering.id_division}
                onChange={(value) => onChangeNumber({id_division:value})}
                options={dataDivisi()}
                onSearch={onSearch}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </div>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>Basic Salary</span>
              {/* <Input placeholder="basic_salary" name='basic_salary' onChange={onChange} allowClear /> */}
              <InputNumber
                disabled={disable}
                style={{
                  width: '100%',
                }}
                value={numbering.basic_salary}
                defaultValue="1"
                min="0"
                max="10000000000000000"
                name="basic_salary"
                // step="0.00"
                formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\Rp\s?|(,*)/g, '')}
                onChange={(value) => onChangeNumber({basic_salary:value})}
                stringMode
              />
            </div>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>Work Overtime</span>
              <InputNumber
                disabled={disable}
                style={{
                  width: '100%',
                }}
                value={numbering.overtime_salary}
                defaultValue="1"
                min="0"
                max="10000000000000000"
                formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\Rp\s?|(,*)/g, '')}
                onChange={(value) => onChangeNumber({overtime_salary:value})}
                stringMode
              />
            </div>
          </Col>


        </Row>
        <Row gutter={[24,24]} className='pt-3'>
          <Col span={8}>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>Nomor Rekening</span>
              <InputNumber
                style={{
                  width: '100%',
                }}
                value={numbering.norek}
                disabled={disable}
                defaultValue="1"
                min="0"
                max="10000000000000000"
                name="norek"
                // step="0.00"
                // formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                // parser={(value) => value.replace(/\Rp\s?|(,*)/g, '')}
                onChange={(value) => onChangeNumber({norek:value})}
                stringMode
              />
            </div>
          </Col>
          <Col span={8}>
          <div className="d-flex flex-column gap-2 pt-2">
              <span>Bank Name</span>
              <Input  placeholder="Bank Name" value={data.bank_name} name='bank_name' onChange={onChange} allowClear />
            </div>
          </Col>
          <Col span={8}>
            <span>Noted</span>
            <TextArea
              showCount
              maxLength={100}
              style={{
                height: 120,
                marginBottom: 24,
              }}
              value={data.note}
              disabled={disable}
              onChange={onChange}
              name='note'
              placeholder="Jika tidak ada note isi -"
            />
          </Col>
        </Row>
        <Button type="primary" loading={loading} onClick={patchAPI}>Create</Button>
        <Button className='ms-2' danger onClick={resetState}>Clear</Button>


      <br />
      <br />
      <br />

      <Title level={4}>View Data</Title>
      <hr />

      <Skeleton loading={loading} paragraph={{ rows: 5 }} className="container">
        <div className=' w-100 px-5' style={{height:'500px', overflowY: 'scroll'}}>
          <div className={`sticky-top ${css.search} `}>
            <p className={css.title_search}>Search :</p>
            <input type="search" onChange={(e) => setSearch(e.target.value)} className={css.input_search} />
            <p className={css.desc_search}>Filter ini hanya bisa digunakan untuk filter nama</p>
          </div>
          <hr style={{color:'black'}} />
          <table className={`table table-responsive`} >
            <thead className={`text-white  ${css.table_head}`}>
              <tr className="">               
                <th className="text-center" scope='col'>No</th>
                <th scope='col'>NIK</th>
                <th scope='col'>Nama</th>
                <th scope='col'>Jabatan</th>
                <th scope='col'>Alamat</th>
                <th scope='col' className=" text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className={`table-group-divider ${css.table_body}`}>
              {dataTable.map((e, index) => (
                <tr key={index}>
                  <th scope='row'className=" text-center">{index + 1}</th>
                  <td style={{ width: "100px" }}>{e.nik?.length  > 15 ? `${e.nik?.slice(0,15)}...` : e.nik}</td>
                  <td style={{ width: "200px" }}>{e.fullname?.length  > 35 ? `${e.fullname?.slice(0,35)}...` : e.fullname}</td>
                  <td  style={{ width: "100px" }}>{e.position?.length  > 12 ? `${e.position?.slice(0,12)}...` : e.position}</td>
                  <td style={{ width: "200px" }}>{e.address?.length  > 45 ? `${e.address?.slice(0,45)}...` : e.address}</td>
                  <td className="text-center d-flex gap-3">
                    {/* <button className={`${css.detail_button}`} onClick={() => handleGetKaryawan(e.id)}>Edit</button> */}
                    <Button type='primary' onClick={() => handleGetKaryawan(e.id)}>Edit</Button>
                    <Button loading={loadingSus} disabled={e.suspend === 'active' ? true : false} onClick={() => handleSuspend(e.id, '0')}>Active</Button>
                    <Button loading={loadingSus} danger disabled={e.suspend === 'deactive' ? true : false} onClick={() => handleSuspend(e.id, '1')}>Deactive</Button>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      </Skeleton>
    
    </>
  )
}

export default ViewData