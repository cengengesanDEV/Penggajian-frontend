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


// get semua karyawan
export const GetAllKaryawan = (name, token) => {
  return axios.get(`${url_be}/users/all-karyawan?search=${name}`, {
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
export const getAll = () => {
  return axios.get(`${url_be}/users/name`);
};

// post lemburan
export const CreateLemburan = (body, token) => {
  return axios.post(`${url_be}/penggajian/add-lembur`, body, {
    headers: { "x-access-token": token },
  });
};




