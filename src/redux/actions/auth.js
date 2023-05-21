import ACTION_STRING from "./actionStrings";
import { Login, Logout, GetProfile } from "../../utility/axios";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Action Logout
const logoutPending = () => ({
  type: ACTION_STRING.logout.concat(ACTION_STRING.pending),
});

const logoutRejected = (error) => ({
  type: ACTION_STRING.logout.concat(ACTION_STRING.rejected),
  payload: { error },
});

const logoutFulfilled = () => ({
  type: ACTION_STRING.logout.concat(ACTION_STRING.fulfilled),
});

const logoutThunk = (token) => {
  return async (dispatch) => {
    try {
      await dispatch(logoutPending());
      await Logout(token);
      dispatch(logoutFulfilled());
    } catch (error) {
      dispatch(logoutRejected(error));
      console.log(error);
    }
  };
};
// Action Login
const loginPending = () => ({
  type: ACTION_STRING.login.concat(ACTION_STRING.pending),
});

const loginRejected = (error) => ({
  type: ACTION_STRING.login.concat(ACTION_STRING.rejected),
  payload: error,
});

const loginFulfilled = (payload) => ({
  type: ACTION_STRING.login.concat(ACTION_STRING.fulfilled),
  payload: payload,
});

const loginThunk = (body) => {
  return async (dispatch) => {
    try {
      await dispatch(loginPending());
      const result = await Login(body);
      await dispatch(loginFulfilled(result.data.data.token));
      await dispatch(userIDThunk(result.data.data.token))
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch(loginRejected(error.response.data.msg));
      throw error.response.data.msg
    }
  };
};

// Action Get user by id
const profilePending = () => ({
  type: ACTION_STRING.profile.concat(ACTION_STRING.pending),
});

const profileRejected = (error) => ({
  type: ACTION_STRING.profile.concat(ACTION_STRING.rejected),
  payload: { error },
});

const profileFulfilled = (data) => ({
  type: ACTION_STRING.profile.concat(ACTION_STRING.fulfilled),
  payload: data ,
});

const userIDThunk = (token) => {
  return async (dispatch) => {
    try {
      await dispatch(profilePending());
      const result = await GetProfile(token);
      // console.log(result.data);
      dispatch(profileFulfilled(result.data.data));
    } catch (error) {
      // console.log("errorUSERID", error.response.data);
      dispatch(profileRejected(error));
      throw error
    }
  };
};

const authAction = {
  logoutThunk,
  userIDThunk,
  loginThunk,
};

export default authAction;
