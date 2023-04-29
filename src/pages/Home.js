import React, { useState } from "react";
import Navbar from "../components/Navbar";

// components
import Dashboard from "../components/Dashboard";
import TitleBar from "../components/Title";

// Hr
import ListKaryawan from "./hr/Listkaryawan";
import Verifikasi from "./hr/Verifikasi";

// Karyawan
import Absensi from "./karyawan/Absensi";
import Penggajian from "./karyawan/Penggajian";
import Profile from "./karyawan/Profile";
import Presensi from "./karyawan/Presensi";

// Admin
import ListKaryawanAdmin from "./admin/ListKaryawan";
import PenggajianAdmin from "./admin/Penggajian";
import AbsensiAdmin from "./admin/Absensi";
import AllDataKaryawan from "./admin/DetailKaryawan";
import Footer from "../components/Footer";

function Home() {
  const [sesion, setSesion] = useState(<Dashboard />);
  const [titleText, setTitleText] = useState("Dashboard");


  // Rendering Component
  const switchSesion = (to, titlename) => {

    /* 
      data to dan titlename di dapat dari file navbar
      to => key untuk sesion
      name => key untuk titlebar 
    */

    switch (to) {
      case "dashboard":
        {
          setTitleText(titlename);
          setSesion(<Dashboard />);
        }
        break;

      // Sesion Admin
      case "admin_karyawan_detail":
        {
          setTitleText(titlename);
          setSesion(<AllDataKaryawan />);
        }
        break;
      case "admin_listkaryawan":
        {
          setTitleText(titlename);
          setSesion(<ListKaryawanAdmin navigation={switchSesion} />);
        }
        break;
      case "admin_penggajian":
        {
          setTitleText(titlename);
          setSesion(<PenggajianAdmin />);
        }
        break;
      case "admin_absensi":
        {
          setTitleText(titlename);
          setSesion(<AbsensiAdmin />);
        }
        break;

      // Sesion HR
      case "hr_listkaryawan":
        {
          setTitleText(titlename);
          setSesion(<ListKaryawan />);
        }
        break;
      case "hr_verifikasi":
        {
          setTitleText(titlename);
          setSesion(<Verifikasi />);
        }
        break;

      // Sesion Karyawan
      case "karyawan_profile":
        {
          setTitleText(titlename);
          setSesion(<Profile />);
        }
        break;
      case "karyawan_presensi":
        {
          setTitleText(titlename);
          setSesion(<Presensi />);
        }
        break;
      case "karyawan_penggajian":
        {
          setTitleText(titlename);
          setSesion(<Penggajian />);
        }
        break;
      case "karyawan_absensi":
        {
          setTitleText(titlename);
          setSesion(<Absensi />);
        }
        break;

      default:
        {
          setTitleText(titlename);
          setSesion(<Dashboard />);
        }
        break;
    }
  };
  

  return (
    <>
      <Navbar navigation={switchSesion} />
      <TitleBar title={titleText} />
      {sesion}
      <Footer />
    </>
  );
}

export default Home;
