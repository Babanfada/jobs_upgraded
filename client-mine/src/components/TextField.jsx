import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { handleChange } from "../features/profile/profileSlice";
// import { handleChange as handleChange2 } from "../features/jobs/jobsSlice";
import { useDispatch } from "react-redux";

export default function PasswordInput({ name, value }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  const getInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  return (
    <FormControl
      size={"small"}
      sx={{ width: "100%", background: "#eff6ff" }}
      variant="outlined"
    >
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={name.charAt(0).toUpperCase() + name.slice(1)}
        name={name}
        value={value}
        onChange={(e) => getInputs(e)}
      />
    </FormControl>
  );
}

export const NameInput = ({ name, value }) => {
  const dispatch = useDispatch();
  const getInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  return (
    <TextField
      label={name.charAt(0).toUpperCase() + name.slice(1)}
      // id="outlined-start-adornment"
      sx={{
        width: "100%",
        background: "#eff6ff",
      }}
      size={"small"}
      fullWidth
      name={name}
      onChange={(e) => getInputs(e)}
      type={name}
      value={value}
    />
  );
};
export const NameInput2 = ({
  name,
  type,
  value,
  handleChange,
  background = "transparent",
  label,
  variant
}) => {
  return (
    <TextField
      label={label ?? name.charAt(0).toUpperCase() + name.slice(1)}
      id="outlined-start-adornment"
      // sx={{ m: 1.5, width: "100%", background: "#eff6ff" }}
      sx={{
        m: 1.5,
        width: "100%",
        background: background || "#eff6ff",
        // border: background || "",
      }}
      variant={variant}
      size={"small"}
      fullWidth
      name={name}
      type={type}
      value={value}
      onChange={(e) => handleChange(e)}
    />
  );
};

export function SelectTextFields({ data, name, value, handleChange }) {
  return (
    <TextField
      id="outlined-select-currency"
      name={name}
      select
      label={name.charAt(0).toUpperCase() + name.slice(1)}
      // defaultValue={data[0]}
      sx={{ m: 1.5, width: "100%", background: "#eff6ff" }}
      size={"small"}
      value={value}
      onChange={(e) => handleChange(e)}
    >
      {data.map((option, index) => (
        <MenuItem key={index} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}
