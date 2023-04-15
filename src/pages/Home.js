import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
const { Header, Content, Footer } = Layout;

const Home = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  
  const [render, updateRender] = useState(1);
  // disini bisa mainin komponen render nya
  const components = {
    1: <div style={{textAlign:'center'}}>Home</div>,
    2: <div style={{textAlign:'center'}}>Option 1</div>,
    3: <div style={{textAlign:'center'}}>Option 2</div>,
  };

  const handleMenuClick = menu => {
    updateRender(menu.key);
  };


  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        <div
          style={{
            float: "left",
            width: 120,
            height: 31,
            margin: "16px 24px 16px 0",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          onClick={handleMenuClick}
          items={[{ label: "home",key:'1'}, { label: "option 1",key:'2' },{label:'option 2' , key:'3'}]}
        />
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 900,
            background: colorBgContainer,
          }}
        >
          {components[render]}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Acil Jakarta ©2023 
      </Footer>
    </Layout>
  );
};
export default Home;
