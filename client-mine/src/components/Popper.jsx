import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";
import { clearStore } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
export default function PopperPopupState() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(clearStore("Logging Out....."));
  };
  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <Button
            variant="contained"
            {...bindToggle(popupState)}
            endIcon={<ArrowDropDownIcon />}
            // startIcon={<AccountCircleIcon />}
            startIcon={
              <Avatar
                sx={{ width: 24, height: 24 }}
                alt="avatar"
                src={user?.image || <AccountCircleIcon />}
              />
            }
            // style={{ fontFamily: "'Fasthand', cursive" }}
          >
            {user?.name}
            {/* {user && user.email} */}
          </Button>
          <Popper
            style={{ zIndex: " 1" }}
            {...bindPopper(popupState)}
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                {/* <Paper> */}
                <Typography sx={{ p: 2 }}>
                  <Button onClick={handleLogOut} variant="contained">
                    logout
                  </Button>
                </Typography>
                {/* </Paper> */}
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}
