import React from "react";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import styles from "../styles/jobcard.module.scss";
import { Link } from "react-router-dom";
import { CustomButton } from "./Button";
const JobCard = () => {
  const jobInfo = [
    {
      icon: <FaLocationArrow />,
      text: " FaLocationArrow",
    },
    {
      icon: <FaCalendarAlt />,
      text: "FaCalendarAlt",
    },
    {
      icon: <FaBriefcase />,
      text: " FaLocationArrow",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <header>
        <span>H</span>
        <span>
          <h5> Data Coordinator</h5>
          <p> Heller,cos and waters</p>
        </span>
      </header>
      <div>
        {jobInfo.map((job, index) => {
          const { icon, text } = job;
          return (
            <div key={index} className={styles.div}>
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          );
        })}
        <div className={styles.status}>status</div>
      </div>
      <footer>
        <CustomButton type="button" sx={{ m: 1.5, width: "100%" }} prop={prop6}>
          Edit
        </CustomButton>
        <CustomButton type="button" sx={{ m: 1.5, width: "100%" }} prop={prop7}>
          Delete
        </CustomButton>
      </footer>
    </div>
  );
};

export default JobCard;
