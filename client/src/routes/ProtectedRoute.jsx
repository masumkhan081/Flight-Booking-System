import React, { useEffect, useState } from "react";
import { setUser } from "../redux/slices/User";
import { getHandler } from "../util/handler";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, pass }) {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.role);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const navigate = useNavigate();
  const { state } = useLocation();

  const authControl = {
    USER: ["profile"],
    ADMIN: ["dashboard", "profile"],
    NOUSER: ["flight-view"],
  };

  if (role && authControl[role].includes(pass)) {
    return <>{children}</>;
  } else {
    return <Loader />;
  }
}
