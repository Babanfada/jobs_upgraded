import React from "react";
import { prop4 } from "../../components/data";
import { CustomButton } from "../../components/Button";
import styles from "../../styles/addjobs.module.scss";
import { NameInput2 } from "../../components/TextField";
const Profile = () => {
  const profile = [
    {
      name: "name",
      textField: <NameInput2 data={"name"} type={"text"} />,
    },
    {
      name: "Last Name",
      textField: <NameInput2 data={"last Name"} type={"text"} />,
    },
    {
      name: "email",
      textField: <NameInput2 data={"email"} type={"email"} />,
    },
    {
      name: "location",
      textField: <NameInput2 data={"location"} type={"text"} />,
    },
    {
      name: "button",
      textField: (
        <CustomButton sx={{ m: 1.5, width: "100%" }} prop={prop4}>
          Save Changes
        </CustomButton>
      ),
    },
  ];

  return (
    <form className={styles.wrapper}>
      <h4>Profile</h4>
      <div>
        {profile.map((field) => {
          const { name, textField } = field;
          return <div key={name}>{textField}</div>;
        })}
      </div>
    </form>
  );
};

export default Profile;
