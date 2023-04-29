import React from "react";

import css from '../style/components/Footer.module.css'

function Footer() {
  return (
    <>
      <div className={`${css.footer} bg-dark`}>
        <p>Email : email@gmail.com</p>
        <p>Telphone : 08123123123123</p>
        <p>Alamat : Jakarta, Cakung Timur</p>
      </div>
    </>
  );
}

export default Footer;
