import { createBrowserRouter } from "react-router-dom";
// import PrivateElement from "./component/PrivateElement";
// import PrivateElementAuth from "./component/PrivateElementAuth";

import Dashboard from "./pages/Dashboard";
import Detailkaryawan from "./pages/Admin/DetailKaryawan"


const router = createBrowserRouter([
  // { path: "/", element: <App />, errorElement: <Error /> },
  { path: "/", element: <Dashboard /> },
  { path: "/detail", element: <Detailkaryawan /> },


]);

export default router;
