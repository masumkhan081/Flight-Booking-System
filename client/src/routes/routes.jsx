import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Profile from "../pages/Profile.jsx";
import Landing from "../pages/Landing.jsx";
import Layout from "../layouts/Layout.jsx";
import OTP from "../components/auth/OTP.jsx";
import Reset from "../components/auth/Reset.jsx";
import Recovery from "../components/auth/Recovery.jsx";
import Auth from "../pages/Auth.jsx";
import Login from "../components/auth/Login.jsx";

import SignUp from "../components/auth/SignUp.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import FlightView from "../pages/FlightView.jsx";
//
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute pass={"dashboard"}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/about",
        element: <Landing />,
      },
      {
        path: "",
        element: (
          // <ProtectedRoute pass={"flight-view"}>
          <FlightView />
          // </ProtectedRoute>
        ),
      },
      {
        path: "auth/",
        element: <Auth />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <SignUp />,
          },
          {
            path: "account-recovery",
            element: <Recovery />,
          },
          {
            path: "reset-password",
            element: <Reset />,
          },
          {
            path: "verify-otp",
            element: <OTP />,
          },
        ],
      },
    ],
  },
]);
