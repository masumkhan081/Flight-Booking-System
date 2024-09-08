import React from "react";
import OverviewCard from "../components/admin/OverviewCard";
import { overviews } from "../static-data/dashboard";
import {
  tblHeaderBooking,
  tblOptions,
  tblHeaderFlight,
} from "../static-data/table";
import { useDispatch, useSelector } from "react-redux";
import FlightTbl from "../components/tabularViews/Flight";
import BookingTbl from "../components/tabularViews/Booking";
import { setCurrentView } from "../redux/slices/adminView";

import { MdAdd } from "react-icons/md";
import { FaInfo } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

export default function Dashboard() {
  //
  const currentView = useSelector((state) => state.adminView.currentView);
  const dispatch = useDispatch();

  // const addBtnTxt = () => currentView==="flight"?""

  //
  return (
    <div className="flex-grow flex flex-col gap-6 p-[20px] md:p-[30px] lg:p-[45px] ">
      {/* summeries */}
      <div className="flex gap-4 ">
        {overviews.map((card) => {
          return <OverviewCard title={card.title} amount={card.amount} />;
        })}
      </div>

      {/*  view option */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between font-rubik bg-slate-100 rounded-md  px-2 py-0.125">
          <div className="flex gap-4  ">
            {tblOptions.map((option, ind) => {
              return (
                <button
                  onClick={(e) =>
                    dispatch(setCurrentView({ view: option, data: [] }))
                  }
                  key={ind}
                  className="py-0.125 px-2 border border-slate-300 rounded capitalize"
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2">
            <button className="flex gap-1 items-center py-0.125 px-2 border border-slate-300 rounded capitalize">
              <MdAdd className="w-5 h-5 " />
              {currentView}
            </button>
          </div>
        </div>

        {/* tablar view */}

        {currentView === "flights" && <FlightTbl />}
        {currentView === "bookings" && <BookingTbl />}
      </div>
    </div>
  );
}
