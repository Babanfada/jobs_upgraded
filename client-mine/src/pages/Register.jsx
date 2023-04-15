import React from "react";
import styles from "../styles/register.module.scss";
import { Paper, Stack } from "@mui/material";
import logo from "../assets/images/logo.svg";
import { prop1, prop2 } from "../components/data";
import { ColorButton, CustomButton } from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { handleToggle, handleChange } from "../features/profile/profileSlice";
import { registerUser, loginUser } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PasswordInput, { NameInput } from "../components/TextField";
const Register = () => {
  const { isMember, name, email, password } = useSelector(
    (store) => store.profile
  );
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let inputField = [
    {
      TextField: <NameInput name={"name"} value={name} />,
    },
    {
      TextField: <NameInput name={"email"} value={email} />,
    },
    {
      TextField: <PasswordInput name={"password"} value={password} />,
    },
  ];

  let modifiedInputField = inputField;

  const removeMember = () => {
    if (isMember) {
      modifiedInputField = inputField.slice(1);
    } else {
      modifiedInputField = inputField;
    }
    return modifiedInputField;
  };
  removeMember();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(handleToggle());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isMember) {
      console.log("login user");
      dispatch(loginUser({ email, password }));
    } else {
      dispatch(registerUser({ name, email, password }));
    }
    console.log("submit");
  };

  const loginTestUser = () => {
    dispatch(loginUser({ email: "testUser@test.com", password: "secret" }));
  };

  React.useEffect(() => {
    if (user) {
      window.setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [user]);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="logo" />
        <h3>{isMember ? "Login" : "Register"}</h3>
        <div>
          {modifiedInputField.map((input, index) => {
            const { TextField } = input;
            return <span key={index}>{TextField}</span>;
          })}
          <Stack sx={{ width: "100%" }} spacing={2} direction={"column"}>
            <CustomButton type="submit" prop={prop1} disabled={isLoading}>
              {isMember ? "Login" : "Register"}
            </CustomButton>
            <CustomButton
              onClick={loginTestUser}
              type="button"
              prop={prop2}
              disabled={isLoading}
            >
              Test User
            </CustomButton>
          </Stack>
        </div>
        <p>
          Already a member?{" "}
          <button onClick={(e) => handleClick(e)}>
            {isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
