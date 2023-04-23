import React, { useState } from 'react'
import Navbar from '../components/Navbar'

// components
import Dashboard from '../components/Dashboard'

// admin
import ListKaryawan from './hr/Listkaryawan'
import Verifikasi from './hr/Verifikasi'

// Karyawan
import Absensi from './karyawan/Absensi'
import Penggajian from './karyawan/Penggajian'
import Profile from './karyawan/Profile'
import Presensi from './karyawan/Presensi'

// HR

function Home() {

  const [sesion, setSesion] = useState(<Dashboard />)


  // Rendering Component
  const switchSesion = (to) => {
    // Data to get in file Navbar (parsing props)
    switch (to) {
      case 'dashboard':
        setSesion(<Dashboard />)
        break;
      
      // Sesion HR
      case 'hr_listkaryawan':
        setSesion(<ListKaryawan />)
        break;
      case 'hr_verifikasi':
        setSesion(<Verifikasi />)
        break;

      // Sesion Karyawan
      case 'karyawan_profile':
        setSesion(<Profile />)
        break;
      case 'karyawan_presensi':
        setSesion(<Presensi />)
        break;
      case 'karyawan_penggajian':
        setSesion(<Penggajian />)
        break;
      case 'karyawan_absensi':
        setSesion(<Absensi />)
        break;
    
      default:
        setSesion(<Dashboard />)
        break;
    }
  }


  return (
    <>
    <Navbar navigation={switchSesion} />
    {sesion}
    </>
  )
}

export default Home