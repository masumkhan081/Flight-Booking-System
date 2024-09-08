import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { initModal } from "../../redux/slices/adminView";
import { MdOutlineClose } from "react-icons/md";

export default function AddFlight() {
  const dispatch = useDispatch();

  const isModalVisible = useSelector((state) => state.adminView.isModalVisible);

  return (
    <div className="bg-green-100 flex flex-col ">
      <div className="flex justify-end">
        <button
          onClick={() =>
            dispatch(initModal({ isModalVisible: false, isModalEdit: false }))
          }
        >
          <MdOutlineClose className="w-6 h-6 text-yellow-800" />
        </button>
      </div>
      <span>hi hello dsjgnjsdgnsdj</span>
    </div>
  );
}
