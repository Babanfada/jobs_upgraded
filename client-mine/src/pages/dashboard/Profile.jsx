import React from "react";
import { prop4 } from "../../components/data";
import { CustomButton } from "../../components/Button";
import styles from "../../styles/addjobs.module.scss";
import { NameInput2 } from "../../components/TextField";
import { updateUser, updateUserProfile } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const Profile = () => {
  const { name, email, lastName, location } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();
  const getInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(updateUserProfile({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      toast.error("You have to provide all fields");
      return;
    }
    dispatch(updateUser({ name, email, lastName, location }));
  };
  const profile = [
    {
      name: "name",
      textField: (
        <NameInput2
          name={"name"}
          type={"text"}
          value={name}
          handleChange={getInputs}
        />
      ),
    },
    {
      name: "Last Name",
      textField: (
        <NameInput2
          name={"lastName"}
          type={"text"}
          value={lastName}
          handleChange={getInputs}
        />
      ),
    },
    {
      name: "email",
      textField: (
        <NameInput2
          name={"email"}
          type={"email"}
          value={email}
          handleChange={getInputs}
        />
      ),
    },
    {
      name: "location",
      textField: (
        <NameInput2
          name={"location"}
          type={"text"}
          value={location}
          handleChange={getInputs}
        />
      ),
    },
    {
      name: "button",
      textField: (
        <CustomButton type="submit" sx={{ m: 1.5, width: "100%" }} prop={prop4}>
          Save Changes
        </CustomButton>
      ),
    },
  ];

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
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
