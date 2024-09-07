import React, { useEffect, useState } from "react";
import { setUser } from "../redux/slices/User";
import { getHandler } from "../util/handler";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, pass }) {
  //

 
const [loading , setLoading] = useState(false);
   
  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.role);

  const navigate = useNavigate();
  const { state } = useLocation()

  const authControl = {
    user: ["profile"],
    admin: ["dashboard"],
  };
  
  useEffect(() => {
    if (user) {
      if (!authControl.user.includes(accessTo)) {
        navigate("/profile", { state: { authenticated: true } });
      }
    }
    if (!user) {
      if (!authControl.noUser.includes(accessTo)) {
        navigate("/auth", { state: { loginView: true, afterLogin: location.pathname } });
      }
    }

  }, [loading]);

  if (loading) {
    return <Loader />;
  } else {
    if (!user) {
      if (authControl.noUser.includes(accessTo)) {
        return <>{children}</>;
      }
      // else {
      //   navigate("/auth", { state: { loginView: true, afterLogin: location.pathname } });
      // }
    } else {
      if (authControl.user.includes(accessTo)) {
        return <>{children}</>;
      }
    }
  }
}
