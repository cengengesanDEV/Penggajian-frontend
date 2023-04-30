import {ActionType} from 'redux-promise-middleware';

const ACTION_STRING = {
    login: 'AUTH_LOGIN',
    pending: `_${ActionType.Pending}`,
    fulfilled: `_${ActionType.Fulfilled}`,
    rejected: `_${ActionType.Rejected}`,
    profile: 'PROFILE',
    logout: 'LOGOUT',
  };
  
  export default ACTION_STRING;