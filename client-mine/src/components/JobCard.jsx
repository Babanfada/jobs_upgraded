import React from "react";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import styles from "../styles/jobcard.module.scss";
import { Link } from "react-router-dom";
import { CustomButton } from "./Button";
import { prop6, prop7 } from "./data";
import moment from "moment";
const JobCard = ({
  position,
  company,
  jobLocation,
  createdAt,
  jobType,
  status,
}) => {
  const date = moment(createdAt).startOf("day").fromNow();
  const jobInfo = [
    {
      icon: <FaLocationArrow />,
      text: jobLocation,
    },
    {
      icon: <FaCalendarAlt />,
      text: date,
    },
    {
      icon: <FaBriefcase />,
      text: jobType,
    },
  ];
  const statusBackground = (status) => {
    if (status === "declined") {
      return "#ffeeee";
    }
    if (status === "interview") {
      return "#e0e8f9";
    }
    return "#fcefc7";
  };
  const statusColor = (status) => {
    if (status === "declined") {
      return "#d66a6a";
    }
    if (status === "interview") {
      return "#647acb";
    }
    return "#e9b949";
  };
  return (
    <div className={styles.wrapper}>
      <header>
        <span>{company.charAt(0)}</span>
        <span>
          <h5>{position}</h5>
          <p> {company}</p>
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
        <div
          style={{
            background: statusBackground(status),
            color: statusColor(status),
          }}
          className={styles.status}
        >
          {status}
        </div>
      </div>
      <footer>
        <CustomButton
          type="button"
          sx={{ m: 1.5, width: "fit-content" }}
          prop={prop6}
        >
          Edit
        </CustomButton>
        <CustomButton
          type="button"
          sx={{ m: 1.5, width: "fit-content" }}
          prop={prop7}
        >
          Delete
        </CustomButton>
      </footer>
    </div>
  );
};

export default JobCard;
