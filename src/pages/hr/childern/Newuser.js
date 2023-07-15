import React, { useEffect, useState } from 'react'
import { Button, Col, DatePicker, Input, InputNumber, Row, Select, Skeleton, Space, Typography, message } from 'antd';
import PicDefault from '../../../assets/user_image.jpg'
import moment from 'moment/moment';
import { CreateKaryawan, getDivision } from '../../../utility/axios';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function Newuser() {

  const { Title } = Typography;
  const { TextArea } = Input;
  const token = useSelector(state=>state.auth.token)

  const [data, setData] = useState({})
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false)
  const [imageUrl, setImageUrl] = useState();
  const [preview, setPreview] = useState(PicDefault)
  const [divisi, setDivisi] = useState([])
  const [numbering, setNumbering] = useState({})
  
  

  const onChange = (e) => {
    console.log({ ...data, [e.target.name]: e.target.value })
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onChangeNumber = (value) => {
    console.log({...numbering, ...value})
    setNumbering({...numbering, ...value})
  }

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const resetState = () => {
    setData({})
    setNumbering({})
  }



  const handleImage = (e) => {
    setLoadingImage(true)
    if(e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/jpg") {
      // console.log(e.target)
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
  

  const createAPI = () => {
    setLoading(true)
    if(!data.fullname  || !data.username || !data.email || !data.bank_name || !data.password || !data.nik || !data.phone_number || !data.address || !numbering.overtime_salary || !numbering.basic_salary || !numbering.id_division || !numbering.role || !numbering.birth_date || !numbering.image || !numbering.norek) {return (message.error('please correct input form again'), setLoading(false))}
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
    if(data.password) body.append('password', data.password)
    if(data.nik) body.append('nik', data.nik)
    if(data.phone_number) body.append('phone_number', data.phone_number)
    if(data.address) body.append('address', data.address)
    if(data.note) body.append('note', data.note)
    CreateKaryawan(body, token)
    .then((res) => {
      window.scrollTo(0, 0)
      resetState()
      setPreview(PicDefault)
      message.success('Create karyawan success')
    })
    .catch((err) => message.error(err.response.data.msg))
    .finally(() => {setLoading(false)})
  }


  


  return (
    <>
      <Title level={4}>Create New Karyawan</Title>
      <hr />
      <Row>
        <Col span={24}>
          {loading ? <Skeleton.Image active={true} /> : <img src={preview} alt="Picture_user" width={100} height={120} />}
          <label style={{border:'1px solid #1677ff', color:'white',backgroundColor:'#1677ff', marginLeft:'10px',padding:'5px 10px', borderRadius:'10px', cursor:'pointer'}} htmlFor="image_preview">Click here to upload picture</label>
          <input type="file" onChange={(e) => handleImage(e)} name="" id="image_preview" style={{display:'none'}} />
        </Col>
      </Row>


      {loading ? <Skeleton className='pt-5' active={true} /> : 
      <>
        <Row gutter={24}>
          <Col span={8}>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>Fullname</span>
              <Input placeholder="Fullname" value={data.fullname} name='fullname' onChange={onChange} allowClear />
            </div>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>Username</span>
              <Input placeholder="Username" value={data.username} name='username' onChange={onChange} allowClear />
            </div>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>Email</span>
              <Input  placeholder="email" value={data.email} name='email' onChange={onChange} allowClear />
            </div>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>password</span>
              <Input placeholder="password" value={data.password} name='password' onChange={onChange} allowClear />
            </div>
          </Col>

          <Col span={8}>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>Nomor induk karyawan (NIK)</span>
              <Input placeholder="nik" value={data.nik} name='nik' onChange={onChange} allowClear />
            </div>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>Phone Number</span>
              <Input placeholder="Phone number" value={data.phone_number} name='phone_number' onChange={onChange} allowClear />
            </div>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>Birth Date</span>
              {/* <Input placeholder="birth_date" name='birth_date' onChange={onChange} allowClear /> */}
              <DatePicker 
                allowClear={true} 
                defaultValue={numbering.birth_date ? dayjs(numbering.birth_date , 'YYYY-MM-DD') : null} 
                value={numbering.birth_date ? dayjs(numbering.birth_date , 'YYYY-MM-DD') : null} 
                format={'YYYY-MM-DD'} onChange={(e,dateString) => onChangeNumber({birth_date : moment(dateString).format('YYYY-MM-DD')})} 
              />
            </div>
            <div className="d-flex flex-column gap-2 pt-2">
              <span>Address</span>
              <Input placeholder="address" value={data.address} name='address' onChange={onChange} allowClear />
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
                style={{
                  width: '100%',
                }}
                defaultValue="1"
                value={numbering.basic_salary}
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
                style={{
                  width: '100%',
                }}
                defaultValue="1"
                value={numbering.overtime_salary}
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
                defaultValue="1"
                value={numbering.norek}
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
              value={data.noted}
              onChange={onChange}
              name='note'
              placeholder="Jika tidak ada note isi -"
            />
          </Col>
        </Row>
        <Button type="primary" onClick={createAPI}>Create</Button>
        <Button className='ms-2' danger onClick={resetState}>Clear</Button>
      </>}
    </>
  )
}

export default Newuser