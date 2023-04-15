import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../utils/localStorage";
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  //   const { user } = getUserFromLocalStorage();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user) {
      window.setTimeout(() => {
        navigate("/landing");
      }, 1000);
    }
    //   if (!user) {
    //     return <Navigate to="/landing" />;
    //   }
  }, [user]);

  return children;
};

export default ProtectedRoute;
