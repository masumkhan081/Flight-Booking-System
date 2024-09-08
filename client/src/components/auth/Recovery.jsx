import React, { useState } from "react";
import Label from "../../common-ui/Label";
import Input from "../../common-ui/Input";
import Button from "../../common-ui/Button";
import { postHandler } from "../../util/handler";

export default function Recovery() {
  const [recoveryEmail, setRecoveryEmail] = useState("masumkhan081@gmail.com");

  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    postHandler("/auth/recovery", { email: recoveryEmail })
      .then((data) => {
        setMsg("A password reset mail has been sent");
      })
      .catch((err) => {
        setMsg("Error sending recovery mail");
      });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="  lg:w-2/5 md:w-1/2 sm:w-2/3 w-full sm:mx-auto mx-2 flex flex-col justify-center bg-slate-100 rounded-md border-2 gap-4 py-4 px-1.5"
    >
      <div className="flex flex-col gap-1">
        <p className="flex justify-between">
          <Label txt="Recovery Email" />
        </p>
        <Input
          required={true}
          type="Email"
          pc="Enter Your Email"
          value={recoveryEmail}
          onChange={(e) => setRecoveryEmail(e.target.value)}
        />
      </div>

      <Button type="submit" txt="Submit" style="btn_auth_submit trans_eio" />

      <p className="font-semibold text-green-700"> {msg} </p>
    </form>
  );
}
