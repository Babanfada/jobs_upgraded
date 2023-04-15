import React from "react";
// import { EveryJobField } from "../../components/data";
import { CustomButton } from "../../components/Button";
import styles from "../../styles/addjobs.module.scss";
import { NameInput2, SelectTextFields } from "../../components/TextField";
import { jobType2, prop5, sort, status2 } from "../../components/data";
import JobCard from "../../components/JobCard";
const EveryJobs = () => {
  const EveryJobField = [
    {
      name: "search",
      textField: <NameInput2 data={"search"} type={"text"} />,
    },

    {
      name: "status",
      textField: <SelectTextFields data={status2} name={"status"} />,
    },
    {
      name: "type",
      textField: <SelectTextFields data={jobType2} name={"type"} />,
    },
    {
      name: "sort",
      textField: <SelectTextFields data={sort} name={"sort"} />,
    },
    {
      name: "button",
      textField: (
        // <div className={styles.btn}>
        <CustomButton sx={{ m: 1.5, width: "100%" }} prop={prop5}>
          Clear filters
        </CustomButton>

        // </div>
      ),
    },
  ];
  return (
    <>
      <form className={styles.wrapper}>
        <h4>Search Form</h4>
        <div>
          {EveryJobField.map((field) => {
            const { name, textField } = field;
            return <div key={name}>{textField}</div>;
          })}
        </div>
      </form>
      <section>
        <JobCard />
      </section>
    </>
  );
};

export default EveryJobs;
