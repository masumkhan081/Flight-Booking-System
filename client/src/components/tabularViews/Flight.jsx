import React, { useEffect } from "react";
import { tblHeaderFlight, tblOptions } from "../../static-data/table";
import { useDispatch, useSelector } from "react-redux";
import {
  checkSingle,
  checkAll,
  setCurrentView,
} from "../../redux/slices/adminView";
import { getHandler } from "../../util/handler";
import { getDateTime } from "../../util/time";
import { FaInfo } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";

export default function FlightTbl() {
  //
  const dispatch = useDispatch();
  const flights = useSelector((state) => state.adminView.flights);
  const allChecked = useSelector((state) => state.adminView.allChecked);
  const currentView = useSelector((state) => state.adminView.currentView);
  //
  useEffect(() => {
    const fetch = async () => {
      const data = await getHandler("/flights");
      // alert("data: " + JSON.stringify());
      dispatch(
        setCurrentView({ view: "flights", data: data?.data?.data?.data })
      );
    };
    fetch();
  }, []);
  //
  return (
    <div className="w-full border rounded-md border-teal-600 overflow-x-scroll">
      <table className="w-full ">
        <thead>
          <tr className="tr_thead">
            <th className="th">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={(e) => dispatch(checkAll())}
              />
            </th>
            {tblHeaderFlight.map((itm, ind) => {
              return (
                <th key={ind} className="th">
                  {itm}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {flights &&
            flights.map((item, ind) => {
              return (
                <tr key={ind} className="tr_tbody">
                  <td className="td">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => dispatch(checkSingle())}
                    />
                  </td>
                  {/* below padding may apply to all */}
                  <td className="py-1.125">{item.flightNumber}</td>
                  <td className="py-1.125">{item.airline}</td>
                  <td className="py-1.125">{item.departureAirport}</td>
                  <td className="py-1.125">{item.arrivalAirport}</td>
                  <td className="py-1.125">
                    {getDateTime(item.departureTime)}
                  </td>
                  <td className="py-1.125">{getDateTime(item.arrivalTime)}</td>
                  <td className="py-1.125">{item.duration + " mins."}</td>
                  <td className="py-1.125">{item.totalSeats}</td>
                  <td className="py-1.125">{item.availableSeats}</td>
                  <td className="py-1.125">{item.price}</td>
                  <td className="py-1.125 flex gap-2 items-center justify-center">
                    <button onClick={() => alert("incomplete !")}>
                      <FaInfo className="w-4 h-4 text-" />
                    </button>
                    <button onClick={() => alert("incomplete !")}>
                      <MdEdit className="w-4 h-5 text-green-700" />
                    </button>
                    <button onClick={() => alert("incomplete !")}>
                      <MdDelete className="w-4 h-4 text-red-600" />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
