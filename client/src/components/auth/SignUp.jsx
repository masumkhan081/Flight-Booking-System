import React, { useState } from "react";
import Input from "../../common-ui/Input";
import Label from "../../common-ui/Label";
// data
import countryDials from "../../static-data/country_dial_info.json";
//  icons
import eye from "../../assets/icons/eye.svg";
import { postHandler } from "../../util/handler";
import { useNavigate } from "react-router-dom";
import { setOtp } from "../../redux/slices/User";
import { useDispatch } from "react-redux";
//
export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //
  const [fullName, setFullName] = useState(
    localStorage.getItem("fullName") || ""
  );
  const [email, setEmail] = useState(localStorage.getItem("signupEmail") || "");
  const [countryCode, setCountryCode] = useState("");
  const [phone, setContact] = useState(localStorage.getItem("phone") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const initErrorState = {
    fullName: "",
    email: "",
    password: "",
    contact: "",
    common: "",
  };
  const [errors, setErrors] = useState(initErrorState);

  //
  async function handleSubmit(e) {
    e.preventDefault();
    //   i need validation here: name must be included, password must be at least 6 char and both matches,
    // email must maintain pattern
    if (fullName.length < 3) {
      setErrors({ ...initErrorState, fullName: "Too short" });
    } else if (password.length < 6) {
      setErrors({ ...initErrorState, password: "At least 6 chars" });
    } else if (password !== confirmPassword) {
      setErrors({ ...initErrorState, password: "Password doesn't match" });
    } else {
      const data = await postHandler("/auth/register", {
        fullName,
        email,
        password,
        phone,
      });
      if (data.data.success) {
        const { email, otp, token } = data?.data;
        dispatch(setOtp({ token, otp, email }));
        navigate("/auth/verify-otp");
      } else {
        setErrors({ ...errors, common: data.data.message });
      }
    }
  }
  //
  function passVisibility(e, id) {
    e.preventDefault();
    var x = document.getElementById(id);
    x.type === "password" ? (x.type = "text") : (x.type = "password");
    setTimeout(() => {
      x.type = "password";
    }, 2000);
  }
  //
  function setTestData(e) {
    e.preventDefault();
    setterName({ target: { value: "Masumk" } });
    setterEmail({ target: { value: "masum498673@gmail.com" } });
    setterPhone({ target: { value: "01833347848" } });
    setPassword("123456");
    setConfirmPassword("123456");
  }
  function setterName(e) {
    setFullName(e.target.value);
    localStorage.setItem("fullName", e.target.value);
  }
  function setterEmail(e) {
    setEmail(e.target.value);
    localStorage.setItem("signupEmail", e.target.value);
  }
  function setterPhone(e) {
    setContact(e.target.value);
    localStorage.setItem("phone", e.target.value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="  lg:w-2/5 md:w-1/2 sm:w-2/3 w-full sm:mx-auto mx-2 flex flex-col justify-center bg-slate-100 rounded-md border-2 gap-4 py-4 px-1.5"
    >
      <div className="flex flex-col">
        <p className="flex justify-between">
          {" "}
          <Label txt="Full Name" />{" "}
          <span className="text-yellow-600 flex justify-end">
            {errors.fullName}
          </span>
        </p>

        <Input
          required={true}
          type="text"
          pc="Enter Full Name"
          value={fullName}
          onChange={setterName}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="flex justify-between">
          {" "}
          <Label txt="Email" />{" "}
          <span className="text-yellow-600 flex justify-end">
            {errors.email}
          </span>
        </p>
        <Input
          required={true}
          type="Email"
          pc="Enter Your Email"
          value={email}
          onChange={setterEmail}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="flex justify-between">
          {" "}
          <Label txt="Phone" />{" "}
          <span className="text-yellow-600 flex justify-end">
            {errors.phone}
          </span>
        </p>
        <div className="flex gap-1 justify-between">
          <select
            onChange={(e) => {
              setCountryCode(e.target.value);
            }}
            className="border border-br/300 rounded-md outline-none"
          >
            {countryDials.map((country, ind) => {
              return (
                <option key={ind} value={country.dial_code}>
                  {country.code + ", " + country.dial_code}
                </option>
              );
            })}
          </select>
          <Input
            required={true}
            type="text"
            pc="Enter your phone number"
            value={phone}
            onChange={setterPhone}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="flex justify-between">
          {" "}
          <Label txt="Password" />{" "}
          <span className="text-yellow-600 flex justify-end">
            {errors.password}
          </span>
        </p>
        <div className="flex gap-1 justify-between border border-br/300 rounded-md">
          <Input
            id="password"
            type="password"
            title="Must contain at least 6 or more characters"
            required={true}
            pc="Set a password"
            style=" flex-grow "
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            onClick={(e) => passVisibility(e, "password")}
            className="ps-1 rounded-r-md border border-l-slate-400"
          >
            <img src={eye} className="icn_sm" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Label txt="Confirm Password" />
        <div className="flex gap-1 justify-between border border-br/300 rounded-md">
          <Input
            id="confirmpassword"
            type="password"
            title="Must contain at least 6 or more characters"
            required={true}
            pc="Password again"
            style=" flex-grow"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <button
            onClick={(e) => passVisibility(e, "confirmpassword")}
            className="ps-1 rounded-r-md border border-l-slate-400"
          >
            <img src={eye} className="icn_sm" />
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={setTestData} className=" btn_test_data ">
          Test Data
        </button>
        <button type="submit" className="btn_auth_submit trans_eio">
          Sign Up
        </button>
      </div>

      <p>{errors.common}</p>
    </form>
  );
}
