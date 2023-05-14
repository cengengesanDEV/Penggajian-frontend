import React, { useState } from 'react'
import Navbar from "../../components/Navbar";
import Footer from '../../components/Footer';
import { Radio, Space, Tabs } from 'antd';
import Title from '../../components/Title';
import DataPenggajian from './childern/DataPenggajian';
import Laporan from './childern/Laporan';


 function Penggajian() {

   const Content = [
      {
         title:'Data Laporan',
         component: <Laporan />
      },
      {
         title:'Data Penggajian',
         component: <DataPenggajian />
      },
   ]

  return (
     <>
     <Navbar />
     <Title title={'Data Penggajian & Lemburan'} />
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

 export default Penggajian