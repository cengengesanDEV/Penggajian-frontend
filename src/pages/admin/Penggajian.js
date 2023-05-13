import React, { useState } from 'react'
import Navbar from "../../components/Navbar";
import Footer from '../../components/Footer';
import { Radio, Space, Tabs } from 'antd';
import Title from '../../components/Title';

 function Penggajian() {

// const [tabPosition, setTabPosition] = useState('left');
//   const changeTabPosition = (e) => {
//     setTabPosition(e.target.value);
//   };

  return (
     <>
     <Navbar />
     <Title title={'Data Penggajian & Lemburan'} />
     <br />

      <div className="container-fluid">
         <Tabs
         tabPosition={'left'}
         items={['Penggajian', 'Lemburan', 'Laporan'].map((el, index) => {
            return {
               label: `Data ${el}`,
               key: index,
               children: `Data asd`,
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