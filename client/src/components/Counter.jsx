import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../redux/slices/counterSlice";
import CustomButton from "../common-ui/CustomButton";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <CustomButton txt={"+1"} clickHndlr={() => dispatch(increment())} />

      <CustomButton txt={"+1"} clickHndlr={() => dispatch(decrement())} />

      <CustomButton txt={"+1"} clickHndlr={() => dispatch(incrementByAmount({}))} />
    </div>
  );
}
