import React from "react";
import styles from "../styles/sidebar.module.scss";
import logo from "../assets/images/logo.svg";
import { links } from "./data";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";

const SideBar = ({ toggle }) => {
  return (
    <div className={styles.wrapper}>
      <nav>
        <img src={logo} alt="logo" />
      </nav>
      <Nav toggle={toggle} />
    </div>
  );
};

export default SideBar;
