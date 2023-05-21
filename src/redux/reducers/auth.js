import ACTION_STRING from "../actions/actionStrings";

const initialState = {
  isError: false,
  isLoading: false,
  isFulfilled: false,
  error: null,
  token: null,
  profile: {
    id: "",
    email: "",
    fullname: "",
    image: "",
    position: "",
    phone_number: "",
    address: "",
    basic_salary: "",
    nik: "",
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
          id: payload.id,
          email: payload.email,
          fullname: payload.fulname,
          image: payload.image,
          position: payload.position,
          phone_number: payload.phone_number,
          address: payload.address,
          basic_salary: payload.basic_salary,
          nik: payload.nik,
          overtime_salary: payload.overtime_salary,
          birth_date: payload.birth_date,
          role: payload.role
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
        error: payload,
      };

    case login + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        token: payload,
        error: null,
      };

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
