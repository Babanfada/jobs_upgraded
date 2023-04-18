import React from "react";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import styles from "../styles/jobcard.module.scss";
import { Link } from "react-router-dom";
import { CustomButton } from "./Button";
import { prop6, prop7, statusBackground, statusColor } from "./data";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setEditJob } from "../features/jobs/jobsSlice";
import { deleteJob } from "../features/jobs/jobsSlice";
const JobCard = ({
  position,
  company,
  jobLocation,
  createdAt,
  jobType,
  status,
  _id,
}) => {
  const dispatch = useDispatch();
  const date = moment(createdAt).startOf("").fromNow();
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
        <Link to="/add-job">
          <CustomButton
            type="button"
            sx={{ m: 1.5, width: "fit-content" }}
            prop={prop6}
            onClick={() =>
              dispatch(
                setEditJob({
                  _id,
                  position,
                  company,
                  jobLocation,
                  jobType,
                  status,
                })
              )
            }
          >
            Edit
          </CustomButton>
        </Link>
        <CustomButton
          type="button"
          sx={{ m: 1.5, width: "fit-content" }}
          prop={prop7}
          onClick={() => {
            if (window.confirm("Are you sure you wannna do this????"))
              dispatch(deleteJob(_id));
          }}
        >
          Delete
        </CustomButton>
      </footer>
    </div>
  );
};

export default JobCard;
