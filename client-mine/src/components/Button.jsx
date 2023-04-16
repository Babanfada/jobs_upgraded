import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";

const CustomButton = styled(Button)(({ prop }) => ({
  color: prop.color,
  width: prop.size || "10vw",
  textTransform: "none",
  fontSize: 16,
  fontWeight: "20px",
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: prop.background || "#0063cc",
  borderColor: prop.background || "#0063cc",
  fontFamily: [
    "Cabin, Sans-Serif",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: prop.backgroundHover || "#0069d9",
    borderColor: prop.backgroundHover || "#0062cc",
    boxShadow: "none",
    color: "#fff" || prop.colorHover,
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: prop.background,
    borderColor: "#005cbf",
  },
  "&:focus": {
    // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

export { ColorButton, CustomButton };
