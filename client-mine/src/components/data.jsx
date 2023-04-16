import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

export const prop1 = {
  color: "#fff",
  background: " #3b82f6",
  backgroundHover: "#1d4ed8",
  size: "100%",
};
export const prop2 = {
  color: "#3b82f6",
  background: " #93c5fd",
  backgroundHover: "#1d4ed8",
  size: "100%",
};
export const prop3 = {
  color: "#fff",
  background: "#243b53",
  backgroundHover: "#222",
  size: "100%",
};
export const prop4 = {
  color: "#fff",
  background: " #3b82f6",
  backgroundHover: "#1d4ed8",
  size: "100%",
};
export const prop5 = {
  color: "#842029",
  background: " #f8d7da",
  backgroundHover: "#842029",
  size: "100%",
  colorHover: "#fff",
};
export const prop6 = {
  marginRight: " 0.5rem",
  color: "#0f5132",
  background: " #d1e7dd",
  backgroundHover: "#0f5132",
  size: "100%",
  colorHover: "#fff",
};
export const prop7 = {
  marginRight: " 0.5rem",
  color: "#842029",
  background: "  #f8d7da",
  backgroundHover: "#842029",
  size: "100%",
  colorHover: "#fff",
};
export const style1 = {
  transform: " translateX(-250px)",
  transition: "0.3s ease-in-out all",
  width: "fit-content",
};
export const style2 = {
  transform: " translateX(0px)",
  transition: "0.3s ease-in-out all",
  width: "fit-content",
};
export const style3 = {
  width: " 100%",
  transition: "0.3s ease-in-out all",
};
export const style4 = {
  width: "calc(100% - 250px)",
  transition: "0.3s ease-in-out all",
};
export const links = [
  { id: 1, text: "stats", path: "/", icon: <IoBarChartSharp /> },
  { id: 2, text: "all jobs", path: "all-jobs", icon: <MdQueryStats /> },
  { id: 3, text: "add job", path: "add-job", icon: <FaWpforms /> },
  { id: 4, text: "profile", path: "profile", icon: <ImProfile /> },
];

export const statusBackground = (status) => {
  if (status === "declined") {
    return "#ffeeee";
  }
  if (status === "interview") {
    return "#e0e8f9";
  }
  return "#fcefc7";
};
export const statusColor = (status) => {
  if (status === "declined") {
    return "#d66a6a";
  }
  if (status === "interview") {
    return "#647acb";
  }
  return "#e9b949";
};
