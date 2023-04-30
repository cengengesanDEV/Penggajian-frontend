import React, { useState } from "react";
import styles from "../style/Login.module.css";
import { useDispatch, useSelector } from "react-redux";

import bg_left from "../assets/Homepage_1.png";

// import icon react bawaan
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

import { Spinner } from "react-bootstrap";

import authActions from "../redux/actions/auth";

function Login() {
  const dispatch = useDispatch();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [fullName, setfullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const handlefullName = (e) => {
    setfullName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleApi = async () => {
    try {
      setLoading(true);
      if (!fullName || !password)
        return (
          //toast here
          setLoading(false)
        );
      await dispatch(authActions.loginThunk( {fullName, password} ));
      console.log(token)
      await dispatch(authActions.userIDThunk(token));
      // toast success here
      // setTimeout(() => {
      //   navigate("/");
      // }, 3000);
    } catch (error) {
      //toast error here
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <main className={styles["container"]}>
        <aside className={styles["left-heading"]}>
          <img src={bg_left} width="100%" height="100%" alt="homepage" />
        </aside>

        <aside className={styles["right-heading"]}>
          <div className={styles["icon-coffee"]}>
            <p>penggajian</p>
            <span>Login</span>
          </div>
          <div className={styles.register}>
            <div className={styles.input}>
              <label>full Name :</label>
              <input
                type="text"
                placeholder="Enter your fullName address"
                onChange={handlefullName}
              />
            </div>
            <div className={styles.input}>
              <label>Password :</label>
              <input
                type={type}
                placeholder="Enter your Password"
                onChange={handlePassword}
              />

              <span onClick={handleToggle}>
                Show Password
                <Icon icon={icon} className="ms-2 my-2" />
              </span>
            </div>
            <div className={styles.button}>
              {loading ? (
                <div className="d-flex justify-content-center align-items-center pt-3">
                  <Spinner animation="border" />
                </div>
              ) : (
                <button onClick={handleApi}>Login</button>
              )}
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}

export default Login;
