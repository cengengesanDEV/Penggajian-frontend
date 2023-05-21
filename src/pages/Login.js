import React, { useState } from "react";
import css from "../style/Login.module.css";
import { useDispatch } from "react-redux";

import authActions from "../redux/actions/auth";
import { Button, Card, Col, Divider, Input, Row, Form, message } from "antd";
import Pic_1 from '../assets/login_pic2.jpg'
import { useNavigate } from "react-router-dom";

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { Meta } = Card;

  const [loading, setLoading] = useState(false)


  // data login terisi semua
  const onFinish =  async (values) => {
    try {
      setLoading(true)
      message.warning("Please Wait")
      await dispatch(authActions.loginThunk({email: values.email, password:values.password}));
      message.success("Login Success")
      navigate('/home')
      setLoading(false)
    } catch (error) {
      message.error("Username / Password WRONG!")
      setLoading(false)
    }
  };

  // validasi LOGIN
  const onFinishFailed = () => {
    setLoading(true)
    message.error("please input data form login first")
    setLoading(false)
  };

  return (
    <>
      <div className="">
        <header className="text-center bg-dark text-white py-4">
          <span>PT. CV Dua Sodara Plastik</span>
        </header>

        <main>
          <Row className={css.main_container}>
            <Col span={12} className={css.left_main}>
              <p className={css.info_left}>INFO</p>
              <p className={css.desc_left}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, esse quia eveniet dolore ducimus eligendi debitis iste labore! Eveniet adipisci, saepe dicta consequatur corrupti odit obcaecati fugiat illum eius minus! Nemo excepturi aliquam reiciendis, quae voluptatibus dolores assumenda nam minus necessitatibus soluta, impedit labore corporis autem quo ullam aperiam dicta!</p>
            </Col>
            <Col span={12} className={css.right_main}>
              <div className={css.box_login}>
                <p className={css.title_login}>FORM LOGIN</p>
                <Form
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    maxWidth: 450,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>


                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button type="primary" loading={loading} htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
          <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0f191b" fillOpacity="1" d="M0,192L60,165.3C120,139,240,85,360,85.3C480,85,600,139,720,176C840,213,960,235,1080,224C1200,213,1320,171,1380,149.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>


          <Divider orientation="center" className="fs-3">About Company</Divider>
          <Row justify="center" className="pt-4" style={{marginLeft:'0 !important', marginRight:'0 !important'}} gutter={100}>
            <Col>
              <Card hoverable style={{width: 240}}
                cover={<img alt="example" src={Pic_1} width='100px' height='200px' />}>
                <Meta title="Produksi" description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione, accusantium eligendi aperiam quis aspernatur aut fuga assumenda iste temporibus et?" />
              </Card>
            </Col>
            <Col>
              <Card hoverable style={{width: 240}}
                cover={<img alt="example" src={Pic_1} width='100px' height='200px' />}>
                <Meta title="Maintance" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam sequi quis magni quisquam nobis ipsam?" />
              </Card>
            </Col>
            <Col>
              <Card hoverable style={{width: 240}}
                cover={<img alt="example" src={Pic_1} width='100px' height='200px' />}>
                <Meta title="Administrasi" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem est praesentium deserunt, voluptate, fuga quo cum laudantium quia laborum amet eos iste consequuntur esse eum." />
              </Card>
            </Col>
          </Row>

          <br />
          <br />
          <br />
        </main>
        


      </div>
    </>
  );
}

export default Login;

