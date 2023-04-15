import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import styles from "../styles/shared.module.scss";
import { style1, style2, style3, style4 } from "../components/data";
import { toggleSideBar, resizeSideBar } from "../features/user/userSlice";
const Shared = () => {
  const { isSideBarOpen } = useSelector((store) => store.user);
  const [isResizeSideBarOpen, setIsResizeSideBarOpen] = React.useState(false);

  React.useEffect(() => {
    function handleResize() {
      setIsResizeSideBarOpen(window.innerWidth <= 981);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSideBar());
  };
  return (
    <div className={styles.wrapper}>
      {isSideBarOpen && window.innerWidth <= 981 && <SideBar toggle={toggle} />}

      <div
        style={isSideBarOpen || isResizeSideBarOpen ? style3 : style4}
        className={styles.topbar}
      >
        <TopBar />
      </div>

      <div style={isResizeSideBarOpen || isSideBarOpen ? style1 : style2}>
        <SideBar />
      </div>

      <div
        style={isSideBarOpen || isResizeSideBarOpen ? style3 : style4}
        className={styles.outlet}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Shared;
