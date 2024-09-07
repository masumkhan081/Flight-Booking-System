import React from "react";

export default function Input({ type, id, pc, style, value, onChange }) {
  const styLogic = () => (style ? "txt_with_child" : "txt_complete");
  return (
    <input
      id={id}
      type={type || "text"}
      className={`${styLogic()} ${style}`}
      placeholder={pc}
      value={value}
      onChange={onChange}
    ></input>
  );
}
