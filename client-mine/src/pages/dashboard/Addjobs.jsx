import React from "react";
import { prop3, prop4 } from "../../components/data";
import { CustomButton } from "../../components/Button";
import styles from "../../styles/addjobs.module.scss";
import { NameInput2, SelectTextFields } from "../../components/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  addJob,
  handleChange,
  clearValues,
  editJob,
} from "../../features/jobs/jobsSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Addjobs = () => {
  const dispatch = useDispatch();
  const getInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  const navigate = useNavigate();
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((store) => store.jobs);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isEditing) {
      dispatch(
        editJob([
          editJobId,
          {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        ])
      );
      setTimeout(() => navigate("/all-jobs"), 3000);

      return;
    }
    dispatch(
      addJob({
        position,
        company,
        jobLocation,
        jobType,
        status,
      })
    );
    setTimeout(() => navigate("/all-jobs"), 3000);
  };
  const resetValues = () => {
    dispatch(clearValues());
  };
  const AddJobField = [
    {
      name: "position",
      textField: (
        <NameInput2
          name={"position"}
          type={"text"}
          value={position}
          handleChange={getInputs}
        />
      ),
    },
    {
      name: "company",
      textField: (
        <NameInput2
          name={"company"}
          type={"text"}
          value={company}
          handleChange={getInputs}
        />
      ),
    },
    {
      name: "job location",
      textField: (
        <NameInput2
          name={"jobLocation"}
          type={"text"}
          value={jobLocation}
          handleChange={getInputs}
        />
      ),
    },
    {
      name: "status",
      textField: (
        <SelectTextFields
          data={statusOptions}
          name={"status"}
          value={status}
          handleChange={getInputs}
        />
      ),
    },
    {
      name: "job type",
      textField: (
        <SelectTextFields
          data={jobTypeOptions}
          name={"jobType"}
          value={jobType}
          handleChange={getInputs}
        />
      ),
    },
    {
      name: "button",
      textField: (
        <div className={styles.btn}>
          <CustomButton
            type="button"
            sx={{ m: 1.5, width: "100%" }}
            prop={prop3}
            onClick={resetValues}
          >
            Clear
          </CustomButton>
          <CustomButton
            type="submit"
            sx={{ m: 1.5, width: "100%" }}
            prop={prop4}
            disabled={isLoading}
          >
            Submit
          </CustomButton>
        </div>
      ),
    },
  ];

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <h4>{isEditing ? "Edit Job" : "Add Job"}</h4>
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
