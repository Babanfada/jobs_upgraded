import React from "react";
import styles from "../../styles/stats.module.scss";
import Cards from "../../components/Cards";
import { useDispatch } from "react-redux";
import { getAllStats } from "../../features/alljobs/allJobsSlice";
import Charts from "../../components/Charts";
const Statistics = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllStats());
  }, []);

  return (
    <div className={styles.wrapper1}>
      <div className={styles.wrapper}>
        <Cards />
      </div>
      <Charts />
    </div>
  );
};

export default Statistics;
