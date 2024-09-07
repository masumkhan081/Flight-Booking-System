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

export default function Dashboard() {
  //
  const currentView = useSelector((state) => state.adminView.currentView);
  const dispatch = useDispatch();

  //
  return (
    <div className="flex-grow flex flex-col gap-8 p-[30px] md:p-[40px] lg:p-[60px] ">
      <div className="flex gap-4 ">
        {overviews.map((card) => {
          return <OverviewCard title={card.title} amount={card.amount} />;
        })}
      </div>

      {/*  view option */}

      <div className="flex gap-4 bg-slate-50 rounded-md p-2">
        {tblOptions.map((option, ind) => {
          return (
            <button
              onClick={(e) =>
                dispatch(setCurrentView({ view: option, data: [] }))
              }
              key={ind}
              className="p-1 border border-slate-300 rounded capitalize"
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* tablar view */}

      {currentView === "flights" && <FlightTbl />}
      {/* {currentView==="bookings" && <BookingTbl/>} */}
    </div>
  );
}
