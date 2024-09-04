import { useState } from "react";
import "./index.css";
import Menu from "./components/Menu";
import { Counter } from "./components/Counter";

function App() {
  return (
    <div className="bg-slate-100 border-2 min-h-screen min-w-full flex flex-col justify-between p-4">
      <Menu />
      <Counter />
    </div>
  );
}

export default App;
