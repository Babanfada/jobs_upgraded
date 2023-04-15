import React from "react";
import { links } from "./data";
import { NavLink } from "react-router-dom";
import styles from "../styles/sidebar.module.scss";
const Nav = ({toggle}) => {
  return (
    <aside>
      {links.map((link) => {
        const { id, text, path, icon } = link;
        return (
          <NavLink
            //   activeclassname={styles.active}
            className={({ isActive }) => {
              return isActive ? styles.active : styles.navlink;
            }}
            to={path}
            //   className={styles.navlink}
            key={id}
            onClick={toggle}
          >
            <span className={styles.span1}>{icon}</span>
            <span className={styles.span2}>
              {text.charAt(0).toUpperCase() + text.slice(1)}
            </span>
          </NavLink>
        );
      })}
    </aside>
  );
};

export default Nav;
