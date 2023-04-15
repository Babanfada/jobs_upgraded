import React from "react";
import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import styles from "../styles/landing.module.scss";
import { ColorButton, CustomButton } from "../components/Button.jsx";
import { Link } from "react-router-dom";

const Landing = () => {
  const prop = {
    color: "#fff",
    background: " #3b82f6",
    backgroundHover: "#1d4ed8",
    size: "fit-content",
  };
  return (
    <div className={styles.nav}>
      <nav>
        <img src={logo} alt="logo" />
      </nav>
      <section>
        <div>
          <h1>
            Job<span>Tracking</span> App
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus,
            voluptate amet. Ipsa sed ex aspernatur.Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Delectus, voluptate amet. Ipsa sed ex
            aspernatur.
          </p>
          <Link to="/register">
            <CustomButton prop={prop}>Register/Login</CustomButton>
          </Link>
        </div>
        <div>
          <img src={main} alt="main" />
        </div>
      </section>
    </div>
  );
};

export default Landing;
