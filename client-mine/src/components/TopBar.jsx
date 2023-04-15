import React from "react";
import styles from "../styles/topbar.module.scss";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";
import PopperPopupState from "./Popper";
import { useSelector, useDispatch } from "react-redux";
import { toggleSideBar } from "../features/user/userSlice";
import logo from "../assets/images/logo.svg";
const TopBar = () => {
  const { isSideBarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(toggleSideBar());
  };
  return (
    <div className={styles.wrapper}>
      <MenuIcon
        onClick={() => toggle()}
        className={styles.faAlign}
      />
      {/* <FaAlignLeft width={"30px"} onClick={() => toggle()} className={styles.faAlign} /> */}
      <h3>Dashboard</h3>
      <img src={logo} alt="logo" />
      <PopperPopupState />
    </div>
  );
};

export default TopBar;
