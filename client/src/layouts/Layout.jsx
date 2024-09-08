import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavTop from "../components/nav/NavTop";
import Cookies from "js-cookie";
import { getHandler } from "../util/handler";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, resetUser, setLoading } from "../redux/slices/User";

export default function Layout() {
  //
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const email = useSelector((state) => state.user.email);
  // const role = useSelector((state) => state.user.role);
  // const authenticated = useSelector((state) => state.user.authenticated);

  useEffect(() => {
    dispatch(setLoading({ loading: true }));
    const cookie = Cookies.get("authorization");

    if (cookie) {
      getHandler("/auth/cookie-check")
        .then((data) => {
          const { role, email, phone, fullName } = data?.data?.data;
          dispatch(
            setUser({ role, email, phone, fullName, authenticated: true })
          );
        })
        .catch((err) => {
          dispatch(resetUser());
        });
    } else {
      dispatch(resetUser());
    }
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <NavTop />
      <Outlet />
    </div>
  );
}
