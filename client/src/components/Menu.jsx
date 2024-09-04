import React, { useState } from "react";
import CustomButton from "../common-ui/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "./counterSlice";

export default function Menu() {
  //
  const menuItems = ["Movies", "Books", "Products"];
  const [menu, setMenu] = useState(menuItems[0]);
  const [currentData, setCurrentData] = useState();

  useEffect(() => {}, [menu]);

  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  //
  return (
    <div className="flex justify-center gap-2 p-2 mx-6">
      {menuItems.map((item) => {
        return (
          <CustomButton
            txt={item}
            clickHndlr={() => {
              setMenu(item);
            }}
          />
        );
      })}
    </div>
  );
}
