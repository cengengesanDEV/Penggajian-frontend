import React from 'react'
import Navbar from "../../components/Navbar";
import { Tabs } from 'antd';
import Title from '../../components/Title';
import Footer from '../../components/Footer';
import Laporan from './childern/Laporan';
import Lembur from './childern/Lembur';
import Verify from './childern/Verify';
import Newuser from './childern/Newuser';
import ViewData from './childern/ViewData';

function ListKaryawan() {

  const Content = [
    {
       title:'Data Laporan',
       component: <Laporan />
    },
    {
       title:'Create User',
       component: <Newuser />
    },
    {
       title:'Edit Karyawan',
       component: <ViewData />
    },
    {
       title:'Data Lemburan',
       component: <Lembur />
    },
    {
       title:'Verify Penggajian',
       component: <Verify />
    },
 ]

  return (
    <>
    <Navbar />
     <Title title={'Data Lemburan & Verify'} />
     <br />

      <div className="container-fluid">
         <Tabs
         tabPosition={'left'}
         items={Content.map((el, index) => {
            return {
               label: el.title,
               key: index,
               children: el.component,
            };
         })}
         />
      </div>

      <br />
     <Footer />
    </>
  )
}

export default ListKaryawan