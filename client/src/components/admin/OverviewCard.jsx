import React from "react";

export default function OverviewCard({ title, amount }) {
  return (
    <div className="flex flex-col gap-3 shadow-sm px-5 py-3 rounded-md bg-slate-50">
      <p className="font-semibold text-yellow-900"> {title}</p>
      <p className="text-center"> {amount}</p>
    </div>
  );
}
