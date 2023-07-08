import axios from "axios";

const url_be = process.env.REACT_APP_API_KEY;

export const Login = (body) => {
  return axios.post(`${url_be}/auth`, body);
};


export const Logout = (token) => {
  return axios.delete(`${url_be}/auth`, {
    headers: { "x-access-token": token },
  });
};



// get profile by token
export const GetProfile = (token) => {
  return axios.get(`${url_be}/users`, {
    headers: { "x-access-token": token },
  });
};


// get detail karyawan beserta absennya
export const GetDetailKaryawan = (id, month, year, token) => {
  return axios.get(`${url_be}/absent/employee/${id}?month=${month}&year=${year}`, {
    headers: { "x-access-token": token },
  });
};



// get semua karyawan not hrd
export const GetAllKaryawan = (name, token) => {
  return axios.get(`${url_be}/users/all-karyawan?search=${name}`, {
    headers: { "x-access-token": token },
  });
};

// get semua karyawan not hrd
export const GetAllRole = (name, token) => {
  return axios.get(`${url_be}/users/all-role?search=${name}`, {
    headers: { "x-access-token": token },
  });
};



// get divisi
export const getDivision = () => {
  return axios.get(`${url_be}/users/division`);
};


// Create karyawan
export const CreateKaryawan = (body, token) => {
  return axios.post(`${url_be}/users`, body, {
    headers: { "x-access-token": token , "Content-Type": "multipart/form-data",},
  });
};

// get karyawan (fullname, id) buat di select
export const getAllSelect = () => {
  return axios.get(`${url_be}/users/name`);
};

// post lemburan
export const CreateLemburan = (body, token) => {
  return axios.post(`${url_be}/penggajian/add-lembur`, body, {
    headers: { "x-access-token": token },
  });
};

// get lemburan
export const GetLemburan = (date, token) => {
  return axios.get(`${url_be}/penggajian/lembur?date=${date}`, {
    headers: { "x-access-token": token },
  });
};

// Get data karyawan berdasarakan ID
export const karyawanDetailID = (id) => {
  return axios.get(`${url_be}/users/karyawan/${id}`);
};

// patch lemburan
export const PatchKaryawanID = (id, body, token) => {
  return axios.patch(`${url_be}/users/profile/${id}`, body, {
    headers: { "x-access-token": token },
  });
};

// untuk checkin
export const CheckinAbsent = (body ,token) => {
  return axios.post(`${url_be}/absent/in`, body, {
    headers: { "x-access-token": token },
  });
};

// untuk checkout
export const CheckoutAbsent = (body, token) => {
  return axios.patch(`${url_be}/absent/out`, body, {
    headers: { "x-access-token": token },
  });
};

// untuk useeffect data kehadiran
export const getAbsent = (token) => {
  return axios.get(`${url_be}/absent/now`, {
    headers: { "x-access-token": token },
  });
};

export const postKeterangan = (body,token) => {
  return axios.post(`${url_be}/absent/not-in`, body, {
    headers: { "x-access-token": token },
  });
};


// edit profile karyawan
export const patchProfileKaryawan = (body,token) => {
  return axios.patch(`${url_be}/users/profile-karyawan`, body, {
    headers: { "x-access-token": token },
  });
};


// absensi karyawan
export const absensiKaryawan = (month,year,token) => {
  return axios.get(`${url_be}/absent/?month=${month}&year=${year}`, {
    headers: { "x-access-token": token },
  });
};

// absensi karyawan
export const penggajianKaryawan = (month,year,token) => {
  return axios.get(`${url_be}/penggajian/gaji-karyawan?month=${month}&year=${year}`, {
    headers: { "x-access-token": token },
  });
};

export const PdfAdmin = (id,month,year,token) => {
  return axios.get(`${url_be}/penggajian/gaji-excel?id=${id}&month=${month}&year=${year}`, {
    headers: { "x-access-token": token },
  });
};


// get all gaji di admin
export const getALLPenggajianAdmin = (month,year,token) => {
  return axios.get(`${url_be}/penggajian/data-penggajian?month=${month}&year=${year}`, {
    headers: { "x-access-token": token },
  });
};

// select penggajian karyawan by id di admin
export const GetkaryawanByIDPenggajian = (id, month, year, token) => {
  return axios.get(`${url_be}/absent/employee/${id}?month=${month}&year=${year}`, {
    headers: { "x-access-token": token },
  });
};


export const verifyAdmin = (body, token) => {
  return axios.post(`${url_be}/penggajian/gaji`,body , {
    headers: { "x-access-token": token },
  });
};


// verify hrd
export const verifyHrd = (body, token) => {
  return axios.post(`${url_be}/penggajian/verif_gaji`,body , {
    headers: { "x-access-token": token },
  });
};

// suspend
export const suspend = (body, token) => {
  return axios.patch(`${url_be}/users/suspend`,body , {
    headers: { "x-access-token": token },
  });
};

// getverify hrd
export const GetverifyHrd = (month,year,token) => {
  return axios.get(`${url_be}/penggajian/get-verif-gaji?month=${month}&year=${year}`, {
    headers: { "x-access-token": token },
  });
};


export const GetInformation = () => {
  return axios.get(`${url_be}/users/division/karyawan`)
};



