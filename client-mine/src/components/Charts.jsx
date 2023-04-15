import React from "react";
import { useSelector } from "react-redux";
import BarChartComponent from "./BarChart";
import Piechart from "./PieChart";
import styles from "../styles/charts.module.scss";
const Charts = () => {
  const { monthlyApplications: data } = useSelector((store) => store.allJobs);
  const [toggleCharts, setToggleCharts] = React.useState(false);
  const handleToggle = () => {
    setToggleCharts(!toggleCharts);
    console.log(toggleCharts);
  };

  return (
    <div className={styles.wrapper}>
      <h4>Monthly Applications</h4>
      <button onClick={handleToggle}>
        {toggleCharts ? "Bar Chart" : "Pie Chart"}
      </button>
      <div>
        {toggleCharts ? (
          <BarChartComponent data={data} />
        ) : (
          <Piechart data={data} />
        )}
      </div>
    </div>
  );
};

export default Charts;
