import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const dispatch = useDispatch();
  const fullName = useSelector((state) => state.user.fullName);
  const role = useSelector((state) => state.user.role);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <span>Profile Info ..</span>
      <span>{fullName}</span>
      <span>role: {role}</span>
      <span className="font-bold ">
        Thanks. Could manage this much only (time factor) as I am already an
        employee of a company
      </span>
    </div>
  );
}
