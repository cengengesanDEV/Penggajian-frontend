import { createBrowserRouter } from "react-router-dom";
// import PrivateElement from "./component/PrivateElement";
// import PrivateElementAuth from "./component/PrivateElementAuth";

// Hr
import ListKaryawan from "./pages/hr/Listkaryawan";
import Verifikasi from "./pages/hr/Verifikasi";

// Karyawan
import Absensi from "./pages/karyawan/Absensi";
import Penggajian from "./pages/karyawan/Penggajian";
import Profile from "./pages/karyawan/Profile";
import Presensi from "./pages/karyawan/Presensi";

// Admin
import ListKaryawanAdmin from "./pages/admin/ListKaryawan";
import PenggajianAdmin from "./pages/admin/Penggajian";
import AbsensiAdmin from "./pages/admin/Absensi";
import AllDataKaryawan from "./pages/admin/DetailKaryawan";

import Home from "./pages/Home";

import Login from "./pages/Login";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/home", element: <Home /> },
  { path: "/hrd", element: <ListKaryawan /> },
  { path: "/hrd/verifikasi", element: <Verifikasi /> },
  { path: "/karyawan", element: <Absensi /> },
  { path: "/karyawan/presensi", element: <Presensi /> },
  { path: "/karyawan/penggajian", element: <Penggajian /> },
  { path: "/karyawan/profile", element: <Profile /> },
  { path: "/admin", element: <ListKaryawanAdmin /> },
  { path: "/admin/penggajian", element: <PenggajianAdmin /> },
  { path: "/admin/absensi", element: <AbsensiAdmin /> },
  { path: "/admin/data-karyawan", element: <AllDataKaryawan /> },
]);

export default router;
