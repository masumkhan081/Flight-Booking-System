import React from "react";
import Label from "../../common-ui/Label";
import { postHandler } from "../../util/handler";
//  icons
import eye from "../../assets/icons/eye.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../../common-ui/Input";
import Button from "../../common-ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/User";
//
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const status = location.state?.loginView;
  const navigate = useNavigate();
  //
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    postHandler("/auth/login", { email, password })
      .then((data) => {
        const { role, email, phone, fullName } = data?.data?.data;
        dispatch(
          setUser({ role, email, phone, fullName, authenticated: true })
        );
        if (role === "ADMIN") {
          navigate("/admin");
        } else if (role === "USER") {
          navigate("/profile");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function setTestData(role) {
    if (role === "admin") {
      setEmail("masumkhan081@gmail.com");
      setPassword("123456");
    } else {
      setEmail("masumkhan.axilsoft@gmail.com");
      setPassword("123456");
    }
  }

  function passVisibility(e, id) {
    e.preventDefault();
    var x = document.getElementById(id);
    x.type === "password" ? (x.type = "text") : (x.type = "password");
    setTimeout(() => {
      x.type = "password";
    }, 2000);
  }

  return (
    <div className="container sm:mx-auto mx-2 h-full flex sm:flex-row flex-col justify-around items-center ">
      <form
        onSubmit={handleSubmit}
        className="md:w-1/2 w-full sm:mx-0 mx-6 flex flex-col gap-6 pt-2 pb-8 px-2 sm:px-4  rounded-md shadow-sm  "
      >
        <div className="flex flex-col gap-1">
          <Label txt="Email" />
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
            pc="Enter Your email"
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <Label txt="Password" />
            {/* <button onClick={(e) => passVisibility(e, "id_password")}>
                <img src={eye} className="icn_sm" />
              </button> */}

            <Link to="/auth/account-recovery" className="text-blue-400">
              Forgot Password ?
            </Link>
          </div>

          <div className="flex gap-1 justify-between border border-br/300 rounded-md">
            {/* <Input type="text" pc="" style="flex-grow" /> */}
            <Input
              type="password"
              title="Must contain at least 6 or more characters"
              required={true}
              id="id_password"
              pc="Set a password"
              style=" flex-grow "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={(e) => passVisibility(e, "id_password")}
              className="ps-1 rounded-r-md border border-l-slate-400"
            >
              <img src={eye} className="icn_sm" />
            </button>
          </div>
        </div>
        <div className="flex justify-start">
          <Button txt="Log In" type="submit" style=" btn_auth_submit "></Button>
        </div>
      </form>
      <div className=" flex flex-col justify-center gap-4">
        <span className="  text-sm rounded-md px-1 ">Test Accounts:</span>

        <Button
          onClick={() => setTestData("admin")}
          txt="admin"
          style=" btn_test_data "
        ></Button>
        <Button
          onClick={() => setTestData("user")}
          txt="normal user"
          style=" btn_test_data "
        ></Button>
      </div>
    </div>
  );
}
