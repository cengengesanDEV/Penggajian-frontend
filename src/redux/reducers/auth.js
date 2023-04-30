import ACTION_STRING from "../actions/actionStrings";

const initialState = {
  isError: false,
  isLoading: false,
  isFulfilled: false,
  error: null,
  token: null,
  profile: {
    email: null,
    username: null,
    fullname: null,
    image: null,
    position: null,
    role: null,
    phone_number: null,
    address: null,
    basic_salary: null,
    birth_date: null,
    nik: null,
  },
};

const authReducer = (prevState = initialState, { type, payload }) => {
  const { logout, profile, pending, rejected, fulfilled, login } =
    ACTION_STRING;

  switch (type) {
    // profile
    case profile + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
        error: null,
      };
    case profile + rejected:
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        error: payload.error.response.data.msg,
      };
    case profile + fulfilled:
      return {
        ...prevState,
        isError: false,
        isFulfilled: true,
        isLoading: false,
        error: null,
        profile: {
          email: payload.data.result[0].email,
          role: payload.data.result[0].role,
          phone_number: payload.data.result[0].phone_number,
          displayname: payload.data.result[0].displayname,
          firstname: payload.data.result[0].firstname,
          lastname: payload.data.result[0].lastname,
          gender: payload.data.result[0].gender,
          birthday: payload.data.result[0].birthday,
          address: payload.data.result[0].address,
          image: payload.data.result[0].image,
        },
      };

    //login
    case login + pending:
      return {
        ...prevState,
        isLoading: true,
        isFulfilled:false,
        isError: false,
        error: null,
      };

    case login + rejected:
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled:false,
        error: payload.error.data.msg,
      };

    case login + fulfilled:
      return console.log(payload)
      // {
      //   ...prevState,
      //   isLoading: false,
      //   isError: false,
      //   isFulfilled: true,
      //   token: payload.data,
      //   error: null,
      // };

    // logout
    case logout + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };
    case logout + rejected:
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        error: payload.error.response.data.msg,
      };

    case logout + fulfilled:
      return initialState;

    default:
      return prevState;
  }
};

export default authReducer;
