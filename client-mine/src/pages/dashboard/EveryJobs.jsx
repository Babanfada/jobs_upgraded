import React from "react";
// import { EveryJobField } from "../../components/data";
import { CustomButton } from "../../components/Button";
import styles from "../../styles/addjobs.module.scss";
import styles1 from "../../styles/everyjobs.module.scss";
import { NameInput2, SelectTextFields } from "../../components/TextField";
import { prop5 } from "../../components/data";
import JobCard from "../../components/JobCard";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChange,
  getAllJobs,
  clearValues,
} from "../../features/alljobs/allJobsSlice";
const EveryJobs = () => {
  const { isLoadings, jobTypeOptions, statusOptions, isEditing, editJobId } =
    useSelector((store) => store.jobs);
  const { sortOptions, search, searchStatus, searchType, sort, jobs } =
    useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllJobs());
  }, [search, searchStatus, searchType, sort]);

  const searchItems = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    dispatch(handleChange({ name, value }));
    dispatch(getAllJobs());
  };
  
  const EveryJobField = [
    {
      name: "search",
      textField: (
        <NameInput2
          name={"search"}
          type={"text"}
          value={search}
          handleChange={searchItems}
        />
      ),
    },

    {
      name: "status",
      textField: (
        <SelectTextFields
          data={["all", ...statusOptions]}
          name={"searchStatus"}
          value={searchStatus}
          handleChange={searchItems}
        />
      ),
    },
    {
      name: "type",
      textField: (
        <SelectTextFields
          data={["all", ...jobTypeOptions]}
          name={"searchType"}
          value={searchType}
          handleChange={searchItems}
        />
      ),
    },
    {
      name: "sort",
      textField: (
        <SelectTextFields
          data={sortOptions}
          name={"sort"}
          value={sort}
          handleChange={searchItems}
        />
      ),
    },
    {
      name: "button",
      textField: (
        <CustomButton
          onClick={() => dispatch(clearValues())}
          sx={{ m: 1.5, width: "100%" }}
          prop={prop5}
        >
          Clear filters
        </CustomButton>
      ),
    },
  ];

  console.log(jobs);
  return (
    <div className={styles1.wrapper}>
      <form className={styles.wrapper}>
        <h4>Search Form</h4>
        <div>
          {EveryJobField.map((field) => {
            const { name, textField } = field;
            return <div key={name}>{textField}</div>;
          })}
        </div>
      </form>
      <h5>{`${jobs.length} job${jobs.length > 1 ? "s" : ""} Found`}</h5>
      <section>
        {jobs.map((job, index) => {
          return <JobCard key={index} {...job} />;
        })}
      </section>
    </div>
  );
};

export default EveryJobs;
