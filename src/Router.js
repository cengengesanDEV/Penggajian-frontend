import { createBrowserRouter } from "react-router-dom";
// import PrivateElement from "./component/PrivateElement";
// import PrivateElementAuth from "./component/PrivateElementAuth";

import Home from "./pages/Home";

import Login from "./pages/Login";

const router = createBrowserRouter([
  // { path: "/", element: <App />, errorElement: <Error /> },
  { path: "/", element: <Login /> },
  { path: "/home", element: <Home /> },
  



]);

export default router;
