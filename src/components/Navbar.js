import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  const [role, setRole] = useState("admin");
  const [list, setList] = useState([]);

  const navigation = useNavigate()

  // Menu admin
  const listMenuAdmin = [
    {
      name: "Dashboard",
      icon: "fa-brands fa-slack",
      navigate: "/home",
    },
    {
      name: "Data Karyawan",
      icon: "fa-solid fa-user",
      navigate: "/admin/all-karyawan",
    },
    {
      name: "Laporan Penggajian",
      icon: "fa-solid fa-bug",
      navigate: "/admin/penggajian",
    },
    {
      name: "Laporan Absensi",
      icon: "fa-solid fa-file-export",
      navigate: "/admin/absensi",
    },
  ];

  // Menu Hr
  const listMenuHr = [
    {
      name: "Dashboard",
      icon: "fa-brands fa-slack",
      navigate: "dashboard",
    },
    {
      name: "Data Karyawan",
      icon: "fa-solid fa-user",
      navigate: "hr_listkaryawan",
    },
    {
      name: "Verifikasi",
      icon: "fa-solid fa-file-export",
      navigate: "hr_verifikasi",
    },
  ];

  const listMenuKaryawan = [
    {
      name: "Dashboard",
      icon: "fa-brands fa-slack",
      navigate: "dashboard",
    },
    {
      name: "Profile",
      icon: "fa-solid fa-user",
      navigate: "karyawan_profile",
    },
    {
      name: "Presensi",
      icon: "fa-solid fa-person-chalkboard",
      navigate: "karyawan_presensi",
    },
    {
      name: "Laporan Penggajian",
      icon: "fa-solid fa-bug",
      navigate: "karyawan_penggajian",
    },
    {
      name: "Laporan Absensi",
      icon: "fa-solid fa-file-export",
      navigate: "karyawan_absensi",
    },
  ];

  // setRole
  useEffect(() => {
    role === "admin"
      ? setList(listMenuAdmin)
      : role === "hr"
      ? setList(listMenuHr)
      : setList(listMenuKaryawan);
  }, [role]);



  return (
    <>
      <nav
        className='navbar bg-dark'
        data-bs-theme='dark'
      >
        <div className='container'>
          <a className='navbar-brand' href='#'>
            CV. Dua Saudara Plastic
          </a>
          <button
            className='navbar-toggler bg-white'
            type='button'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasNavbar'
            aria-controls='offcanvasNavbar'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='offcanvas offcanvas-end bg-dark '
            tabIndex='-1'
            id='offcanvasNavbar'
            aria-labelledby='offcanvasNavbarLabel'
          >
            <div className='offcanvas-header'>
              <h5
                className='offcanvas-title'
                id='offcanvasNavbarLabel'
              >
                Menu
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='offcanvas'
                aria-label='Close'
              ></button>
            </div>
            <div className='offcanvas-body'>
              {/* Body Menu */}
              {list.map((e, index) => (
                <div
                  key={index}
                  style={{cursor:'pointer', marginBottom:'10px', marginTop:'10px'}}
                  className='d-flex flex-row'
                  onClick={() => navigation(e.navigate)}
                >
                  <i
                    className={`${e.icon} pe-3 pt-1 fs-6`}
                  ></i>
                  <p>{e.name}</p>
                </div>
              ))}
              <p>Logout</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
