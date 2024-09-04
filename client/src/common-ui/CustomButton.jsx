import React from "react";

export default function CustomButton({ clickHndlr, txt }) {
  return (
    <div className="text-black border border-slate-500 px-2 py-1 rounded-md">
      <button onClick={clickHndlr}>{txt}</button>
    </div>
  );
}
