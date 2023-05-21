import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import css from '../style/Home.module.css'
import { useDispatch, useSelector } from "react-redux";
import { Button, message } from "antd";
import authAction from "../redux/actions/auth"

function Navbar() {

  const roles = useSelector((state) => state.auth.profile.role)
  const token = useSelector((state) => state.auth.profile.token)

  const [role, setRole] = useState(roles)
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)

  const navigation = useNavigate()
  const dispatch = useDispatch()

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
      navigate: "/home",
    },
    {
      name: "Data Karyawan",
      icon: "fa-solid fa-user",
      navigate: "/hrd",
    },
    // {
    //   name: "Verifikasi",
    //   icon: "fa-solid fa-file-export",
    //   navigate: "/hrd/verifikasi",
    // },
  ];

  const listMenuKaryawan = [
    {
      name: "Dashboard",
      icon: "fa-brands fa-slack",
      navigate: "/home",
    },
    {
      name: "Profile",
      icon: "fa-solid fa-user",
      navigate: "/karyawan_profile",
    },
    {
      name: "Presensi",
      icon: "fa-solid fa-person-chalkboard",
      navigate: "/karyawan_presensi",
    },
    {
      name: "Laporan Penggajian",
      icon: "fa-solid fa-bug",
      navigate: "/karyawan_penggajian",
    },
    {
      name: "Laporan Absensi",
      icon: "fa-solid fa-file-export",
      navigate: "/karyawan_absensi",
    },
  ];

  // setRole
  useEffect(() => {
    role === "admin"
      ? setList(listMenuAdmin)
      : role === "hrd"
      ? setList(listMenuHr)
      : setList(listMenuKaryawan);
  }, [role]);


  const logoutAPI = async () => {
    try {
      setLoading(true)
      await dispatch(authAction.logoutThunk(token))
      message.success('Logout Success')
      navigation('/')
      setLoading(false)
    } catch (error) {
      console.log(error)
      message.info('error server')
      setLoading(false)
    }
  }


  return (
    <>
      <nav className='navbar bg-dark' data-bs-theme='dark'>
        <div className='container'>
          <a className='navbar-brand' href='/'>
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
            className={`offcanvas offcanvas-end text-dark bg-dark ${css.image_side}`}
            tabIndex='-1'
            id='offcanvasNavbar'
            aria-labelledby='offcanvasNavbarLabel'
          >
            <div className='offcanvas-header bg-dark'>
              <h5
                className='offcanvas-title text-white'
                id='offcanvasNavbarLabel'
              >
                Menu
              </h5>
              <button
                // type='button'
                className='btn-close'
                data-bs-dismiss='offcanvas'
                aria-label='Close'
              ></button>
            </div>
            <div className={`offcanvas-body ${css.hover_menu}`}>
              {/* Body Menu */}
              {list.map((e, index) => (
                <div
                  key={index}
                  data-bs-dismiss='offcanvas'
                  style={{cursor:'pointer', marginBottom:'10px', marginTop:'10px', padding:'10px 0 0 10px'}}
                  className='d-flex flex-row'
                  onClick={() => navigation(e.navigate)}
                >
                  <i
                    className={`${e.icon} pe-3 pt-1 fs-6`}
                  ></i>
                  <p className="">{e.name}</p>
                </div>
              ))}
              <Button type="primary" danger loading={loading} onClick={logoutAPI}>Logout</Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
