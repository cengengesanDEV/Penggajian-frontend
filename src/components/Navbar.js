import React, {
  useEffect,
  useState,
} from "react";

function Navbar(props) {
  const [role, setRole] = useState("karyawan");
  const [list, setList] = useState([]);

  // Menu admin
  const listMenuAdmin = [
    {
      name: "Dashboard",
      icon: "fa-brands fa-slack",
      lock: "dashboard",
    },
    {
      name: "Data Karyawan",
      icon: "fa-solid fa-user",
      lock: "admin_listkaryawan",
    },
    {
      name: "Laporan Penggajian",
      icon: "fa-solid fa-bug",
      lock: "admin_penggajian",
    },
    {
      name: "Laporan Absensi",
      icon: "fa-solid fa-file-export",
      lock: "admin_absensi",
    },
  ];

  // Menu Hr
  const listMenuHr = [
    {
      name: "Dashboard",
      icon: "fa-brands fa-slack",
      lock: "dashboard",
    },
    {
      name: "Data Karyawan",
      icon: "fa-solid fa-user",
      lock: "hr_listkaryawan",
    },
    {
      name: "Verifikasi",
      icon: "fa-solid fa-file-export",
      lock: "hr_verifikasi",
    },
  ];

  const listMenuKaryawan = [
    {
      name: "Dashboard",
      icon: "fa-brands fa-slack",
      lock: "dashboard",
    },
    {
      name: "Profile",
      icon: "fa-solid fa-user",
      lock: "karyawan_profile",
    },
    {
      name: "Presensi",
      icon: "fa-solid fa-person-chalkboard",
      lock: "karyawan_presensi",
    },
    {
      name: "Laporan Penggajian",
      icon: "fa-solid fa-bug",
      lock: "karyawan_penggajian",
    },
    {
      name: "Laporan Absensi",
      icon: "fa-solid fa-file-export",
      lock: "karyawan_absensi",
    },
  ];

  useEffect(() => {
    role === "admin"
      ? setList(listMenuAdmin)
      : role === "hr"
      ? setList(listMenuHr)
      : setList(listMenuKaryawan);
  }, [role]);


  // Send data lock to file home
  const Linkto = (to, titlename) => {
    props.navigation(to,titlename);
  };

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
                  className='d-flex flex-row'
                  onClick={() => Linkto(e.lock, e.name)}
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
