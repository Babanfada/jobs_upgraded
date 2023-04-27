import React from "react";
import styles from "../styles/register.module.scss";
import { Paper, Stack } from "@mui/material";
import logo from "../assets/images/logo.svg";
import { prop1, prop2 } from "../components/data";
import { ColorButton, CustomButton } from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
// export const uploadFile = createAsyncThunk("profile/uploadfile", uploadFileThunk);
import {
  handleToggle,
  handleChange,
  uploadFile,
} from "../features/profile/profileSlice";
import { registerUser, loginUser } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PasswordInput, { NameInput, NameInput2 } from "../components/TextField";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Registeration = () => {
  const { isMember, name, email, password, image } = useSelector(
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
  const uploadAvatar = (e) => {
    const imageValue = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageValue);
    dispatch(uploadFile(formData));
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
      dispatch(registerUser({ name, email, password, image }));
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
          {/* <div> */}
          {isMember ? (
            ""
          ) : (
            <NameInput2
              name={"avatar"}
              type={"file"}
              label={""}
              // value={avatar}
              variant={"standard"}
              handleChange={uploadAvatar}
              helper={"You may upload an avatar"}
            />
          )}
          <div
            style={{
              display: "flex",
              justifySelf: "flex-start",
              marginBottom: "2vh",
            }}
          >
            {image && (
              <img style={{ width: 24, height: 24 }} src={image} alt="avatar" />
            )}
            {/* {image ? (
              <img style={{ width: 24, height: 24 }} src={image} alt="avatar" />
            ) : (
              <AccountCircleIcon />
            )} */}
          </div>
          {/* </div> */}
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

export default Registeration;
