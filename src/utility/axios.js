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
export const GetProfile = (token) => {
  return axios.get(`${url_be}/users`, {
    headers: { "x-access-token": token },
  });
};
