import React, { useState } from 'react'
import Navbar from "../../components/Navbar";
import { Col, Descriptions, Row,Button, DatePicker, Drawer, Form, Input, Select, Space, message } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../../components/Title';
import Footer from '../../components/Footer';
import { patchProfileKaryawan } from '../../utility/axios';
import authAction from '../../redux/actions/auth';

function Profile() {
  
  const { Option } = Select;
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.auth.profile)
  const token = useSelector((state) => state.auth.token)
  
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    fullname: profile.fullname,
    phone_number: profile.phone_number,
    address: profile.address
  })

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleEdit = async () => {
    try {
      await patchProfileKaryawan(values, token)
      await dispatch(authAction.userIDThunk(token))
      message.success("Success Edit Profile")
      setOpen(false)
    } catch (error) {
      console.log(error)
      message.error("Edit failed")
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
      <Navbar />
      <Title title={'Profile'} />
      <div className="container-fluid p-5">
      <Row>
        <Col span={12}>
          <img src={profile.image} alt="image-profile" width="250px" height="200px" style={{transform:"scale(1)"}} />
        </Col>
        <Col span={12} className='d-flex flex-column align-items-end justify-content-end'>
          <Button type="primary" onClick={showDrawer}>
            Edit Account
          </Button>
          <Drawer
            title="Change profile account"
            width={720}
            onClose={onClose}
            open={open}
            bodyStyle={{
              paddingBottom: 80,
            }}
            extra={
              <Space>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="primary" onClick={handleEdit}>
                  Submit
                </Button>
              </Space>
            }
          >
            <Form layout="vertical">
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="Fullname" label="Fullname">
                    <Input placeholder="Please enter fullname" defaultValue={values.fullname} value={values.fullname} onChange={(e) => {setValues({...values,fullname:e.target.value})}} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Username" label="Username">
                    <Input placeholder="Please enter username" defaultValue={profile.username} disabled />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="Nik" label="Nik">
                    <Input placeholder="Please enter Nik" defaultValue={profile.nik} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Phone Number" label="Phone Number">
                    <Input placeholder="Please enter Phone Number" value={values.phone_number} defaultValue={values.phone_number} onChange={(e) => {setValues({...values,phone_number:e.target.value})}} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="Number Rekening" label="Number Rekening">
                    <Input placeholder="Please enter Number Rekening" defaultValue={profile.norek} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Birth Date" label="Birth Date">
                    <Input placeholder="Please enter Birth Date" defaultValue={profile.birth_date?.slice(0,10)} disabled />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="Overtime Salary" label="Overtime Salary">
                    <Input placeholder="Please enter Overtime Salary" defaultValue={costing(profile.overtime_salary)} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Basic Salary" label="Basic Salary">
                    <Input placeholder="Please enter Basic Salary" defaultValue={costing(profile.basic_salary)} disabled />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="Address" label="Address">
                    <Input placeholder="Please enter Address" value={values.address} defaultValue={values.address} onChange={(e) => {setValues({...values,address:e.target.value})}} />
                  </Form.Item>
                </Col>               
              </Row>
              
            </Form>
          </Drawer>
        </Col>
      </Row>

      
      <hr />

      <Descriptions title="Detail Account">
        <Descriptions.Item label="Fullname">{profile.fullname}</Descriptions.Item>
        <Descriptions.Item label="Username">{profile.username}</Descriptions.Item>
        <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
        <Descriptions.Item label="Nik">{profile.nik}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">{profile.phone_number}</Descriptions.Item>
        <Descriptions.Item label="Number Rekening">{`(${profile.bank_name}) ${profile.norek}`}</Descriptions.Item>
        <Descriptions.Item label="Birth Date">{profile.birth_date?.slice(0,10)}</Descriptions.Item>
        <Descriptions.Item label="Position">{profile.position}</Descriptions.Item>
        <Descriptions.Item label="Basic Salary">{costing(profile.basic_salary)}</Descriptions.Item>
        <Descriptions.Item label="Overtime Salary">{costing(profile.overtime_salary)}</Descriptions.Item>
        <Descriptions.Item label="Address">{profile.address}</Descriptions.Item>
      </Descriptions>
      </div>

      <Footer />
    </>
  )
}

export default Profile