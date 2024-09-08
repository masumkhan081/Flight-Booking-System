import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import menu from "../../assets/icons/menu.svg";
import close from "../../assets/icons/close.svg";
import CustomLink from "../../common-ui/CustomLink";
import Button from "../../common-ui/Button";
import ProjectList from "../ProjectList";
import { BsInfoCircle, BsList, BsListNested, BsInfoLg } from "react-icons/bs";
import { BiSolidUserPlus, BiUserPlus, BiLogInCircle } from "react-icons/bi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AiFillHome, AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdFlightTakeoff } from "react-icons/md";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { getHandler } from "../../util/handler";

export default function NavTop() {
  //
  const [menuFolded, setMenuFolded] = useState(true);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.authenticated);
  const notify = (msg) => toast(msg);
  //
  function handleLogout() {
    Cookies.remove("authorization");

    getHandler("/auth/logout")
      .then((data) => {
        notify("Dick Pulled Out Succesfully");
        navigate("/auth/login");
      })
      .catch((err) => {
        alert("logout: err: " + JSON.stringify(err));
      });
  }

  const styLogic = () =>
    menuFolded
      ? "sm:flex hidden  sm:grow  gap-4 justify-end items-center text-green-800 "
      : "  z-10 sm:hidden block absolute   top-[52px] left-[10px] right-[10px] rounded-md  h-auto flex flex-col gap-4 bg-green-200 border border-br/600 px-4 py-4";

  return (
    <div className="  sm:px-3.0 px-1.0 flex justify-between items-center py-3  font-averia font-semibold text-1/1.25 shadow-sm shadow-orange-200 rounded-b-md">
      <div className="">
        <CustomLink to="/" txt="Flight Booking System" style="brand">
          <MdFlightTakeoff className="w-1.75 h-1.75 text-green-900" />
        </CustomLink>
      </div>
      <div className={styLogic()}>
        {!isAuthenticated && (
          <Button
            onClick={() => {
              setMenuFolded(true);
              navigate("/auth/register");
            }}
            txt="Sign Up"
            icon={<BiLogInCircle className="nav_icn" />}
            style={"btn_nav"}
          />
        )}

        {!isAuthenticated && (
          <Button
            onClick={() => {
              setMenuFolded(true);
              navigate("/auth/login");
            }}
            txt="Log In"
            icon={<BiLogInCircle className="nav_icn" />}
            style={"btn_nav"}
          />
        )}

        {isAuthenticated && (
          <Button
            onClick={handleLogout}
            txt="Log Out"
            icon={<RiLogoutCircleRLine className="nav_icn" />}
            style={"btn_nav"}
          />
        )}
        {isAuthenticated && (
          <Button
            onClick={() => {
              setMenuFolded(true);
              navigate("/profile");
            }}
            txt="Profile"
            icon={<BiLogInCircle className="nav_icn" />}
            style={"btn_nav"}
          />
        )}
      </div>
      <div className="sm:hidden block">
        <Button
          icon={
            menuFolded ? (
              <GiHamburgerMenu className="nav_icn" />
            ) : (
              <AiOutlineClose className="nav_icn" />
            )
          }
          onClick={() => setMenuFolded(!menuFolded)}
        />
      </div>
    </div>
  );
}
