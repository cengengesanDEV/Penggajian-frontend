import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { ShopOutlined } from '@ant-design/icons';

// Admin
import DashboardAdmin from "../pages/Admin/DashboardAdmin";
import ListKaryawanAdmin from "../pages/Admin/ListKaryawan";

// HR
import DashboardHr from "../pages/HR/DashboardHr"
import ListKaryawanHr from "../pages/HR/ListKaryawan"


const { Header, Content, Footer } = Layout;

const Layouts = ({username, roles = "admin"}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  
  const [render, updateRender] = useState(1);
  // const [roles, setRole] = useState("admin");

    // Render Content
    const components = {
      1: roles === 'admin' ? <DashboardAdmin /> : <DashboardHr />,
      2: roles === 'admin' ? <ListKaryawanAdmin /> : <ListKaryawanHr />,
    };

  // render navbar
  const nav = [
    {
      key : "1",
      label : roles === "admin" ? "admin" :"Home HR"
    },
    {
      key : "2",
      label : roles === "admin" ? "Data admin" :"Data HR"
    },
  ]



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
        <div className="">
          
          <ShopOutlined style={{float:'left',marginRight:'20px', fontSize: '20px', color: 'white',padding:"25px 0 0 0" }} />
          <p style={{float:'left',marginRight:'25px',color:'white', fontSize: '20px'}}>
            CV. Sodara Plastik
          </p>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          onClick={handleMenuClick}
          items={nav}
        />
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb style={{margin: "16px 0"}}>
          <Breadcrumb.Item>Hi, {username}</Breadcrumb.Item>
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
        Jakarta ©2023
      </Footer>
    </Layout>
  );
};
export default Layouts;
