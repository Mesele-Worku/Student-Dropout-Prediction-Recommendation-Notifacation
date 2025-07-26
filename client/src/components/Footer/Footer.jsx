import React from "react";
import style from "./footer.module.css";
import logo from "../../assets/evangadi-logo-footer.png";
import { FaFacebookF } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";

import { FaYoutube } from "react-icons/fa6";



function Footer() {
  return (
    <section className={style.footer_container}>
      <section className={style.footer_inner_container}>
        {/* left side links wrapper */}
        <div className={style.left_side_links}>
          <div className={style.footer_logo}>
            <a href="/">
              <img src={logo} alt="" />
            </a>
          </div>
          <div className={`style.footer_icons flex`}>
            <a href="https://www.facebook.com/evangaditech" target="_blank">
              <FaFacebookF size={30} />
            </a>
            <a href="https://www.instagram.com/evangaditech" target="_blank">
              <TiSocialInstagram size={30} />
            </a>
            <a href="https://www.youtube.com/@EvangadiTech" target="_blank">
              <FaYoutube size={30} />
            </a>
          </div>
        </div>
        {/* middle links wrapper */}
        <div className={style.middle_links}>
          <h4>Useful link</h4>
          <p>
            <a href="how-it-works">How it works</a>
          </p>
          <p>
            <a href="https://www.evangadi.com/legal/terms/" target="_blank">
              Terms of Service
            </a>
          </p>
          <p>
            <a href="https://www.evangadi.com/legal/privacy/" target="_blank">
              Privacy policy
            </a>
          </p>
        </div>
        {/* right side links wrapper */}
        <div className={style.right_side_links}>
          <h4>Contact Info</h4>
          <p>
            <a href="/">Evangadi Networks</a>
          </p>
          <p>support@evangadi.com</p>
          <p>+1-202-386-2702</p>
        </div>
      </section>
    </section>
  );
}

export default Footer;
