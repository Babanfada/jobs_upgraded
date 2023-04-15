import React from "react";
import styles from "../styles/cards.module.scss";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import { getAllStats } from "../features/alljobs/allJobsSlice";
import { useSelector, useDispatch } from "react-redux";
const Cards = () => {
  const { stats } = useSelector((store) => store.allJobs);

  const defaultStats = [
    {
      title: "pending applications",
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling style={{ fontSize: "2rem" }} />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: stats.interview || 0,
      icon: <FaCalendarCheck style={{ fontSize: "2rem" }} />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: stats.declined || 0,
      icon: <FaBug style={{ fontSize: "2rem" }} />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return defaultStats.map((stat, index) => {
    const { title, icon, color, count, bcg } = stat;
    return (
      <div
        key={index}
        style={{ borderBottom: color }}
        className={styles.wrapper}
      >
        <header>
          <span style={{ color: color }}>{count}</span>
          <span style={{ color: color, background: bcg }}>{icon}</span>
        </header>
        <h5>{title}</h5>
      </div>
    );
  });
};

export default Cards;
