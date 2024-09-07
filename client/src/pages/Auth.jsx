import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Signup from "../components/auth/SignUp";
import Login from "../components/auth/Login";

export default function Auth() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Outlet />
      
    </div>
  );
}
