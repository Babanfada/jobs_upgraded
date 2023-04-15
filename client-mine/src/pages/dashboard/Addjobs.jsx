import React from "react";
import { jobType, prop3, prop4, status } from "../../components/data";
import { CustomButton } from "../../components/Button";
import styles from "../../styles/addjobs.module.scss";
import { NameInput2, SelectTextFields } from "../../components/TextField";
const Addjobs = () => {
  const AddJobField = [
    {
      name: "position",
      textField: <NameInput2 data={"position"} type={"text"} />,
    },
    {
      name: "company",
      textField: <NameInput2 data={"company"} type={"text"} />,
    },
    {
      name: "job location",
      textField: <NameInput2 data={"job location"} type={"text"} />,
    },
    {
      name: "status",
      textField: <SelectTextFields data={status} name={"status"} />,
    },
    {
      name: "job type",
      textField: <SelectTextFields data={jobType} name={"jobType"} />,
    },
    {
      name: "button",
      textField: (
        <div className={styles.btn}>
          <CustomButton sx={{ m: 1.5, width: "100%" }} prop={prop3}>
            Clear
          </CustomButton>
          <CustomButton sx={{ m: 1.5, width: "100%" }} prop={prop4}>
            Submit
          </CustomButton>
        </div>
      ),
    },
  ];

  return (
    <form className={styles.wrapper}>
      <h4>Add Job</h4>
      <div>
        {AddJobField.map((field) => {
          const { name, textField } = field;
          return <div key={name}>{textField}</div>;
        })}
      </div>
    </form>
  );
};

export default Addjobs;
