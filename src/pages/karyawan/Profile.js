import React, { useState } from 'react'
import Navbar from "../../components/Navbar";
import { Col, Descriptions, Row,Button, DatePicker, Drawer, Form, Input, Select, Space } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Title from '../../components/Title';
import Footer from '../../components/Footer';

function Profile() {
  
  const { Option } = Select;
  const profile = useSelector((state) => state.auth.profile)
  
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
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
                <Button type="primary">
                  Submit
                </Button>
              </Space>
            }
          >
            <Form layout="vertical" hideRequiredMark>
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="Fullname" label="Fullname">
                    <Input placeholder="Please enter fullname" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Username" label="Username">
                    <Input placeholder="Please enter username" disabled />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="Nik" label="Nik">
                    <Input placeholder="Please enter Nik" disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Phone Number" label="Phone Number">
                    <Input placeholder="Please enter Phone Number" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="Number Rekening" label="Number Rekening">
                    <Input placeholder="Please enter Number Rekening" disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Birth Date" label="Birth Date">
                    <Input placeholder="Please enter Birth Date" disabled />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="Overtime Salary" label="Overtime Salary">
                    <Input placeholder="Please enter Overtime Salary" disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Basic Salary" label="Basic Salary">
                    <Input placeholder="Please enter Basic Salary" disabled />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="Address" label="Address">
                    <Input placeholder="Please enter Address" />
                  </Form.Item>
                </Col>               
              </Row>
              
            </Form>
          </Drawer>
        </Col>
      </Row>

      
      <hr />

      <Descriptions title="Detail Account">
        <Descriptions.Item label="Fullname">Muhammad farisan</Descriptions.Item>
        <Descriptions.Item label="UserName">Farisan</Descriptions.Item>
        <Descriptions.Item label="Email">muhammad.farisan@gmail.com</Descriptions.Item>
        <Descriptions.Item label="Nik">1123412312</Descriptions.Item>
        <Descriptions.Item label="Phone Number">01823988189273</Descriptions.Item>
        <Descriptions.Item label="Number Rekening">41400401</Descriptions.Item>
        <Descriptions.Item label="Birth Date">1999-09-09</Descriptions.Item>
        <Descriptions.Item label="Position">CEO</Descriptions.Item>
        <Descriptions.Item label="Basic Salary">18.000.000</Descriptions.Item>
        <Descriptions.Item label="Overtime Salary">200.000</Descriptions.Item>
        <Descriptions.Item label="Address">jalan pasopati dewa kembar cilincing jakarta utara</Descriptions.Item>
      </Descriptions>
      </div>

      <Footer />
    </>
  )
}

export default Profile