import React, { useEffect } from "react";
import {
  tblHeaderBooking,
  tblHeaderFlight,
  tblOptions,
} from "../../static-data/table";

import { useDispatch, useSelector } from "react-redux";
import {
  checkSingle,
  checkAll,
  setCurrentView,
} from "../../redux/slices/adminView";

import { getHandler } from "../../util/handler";

export default function BookingTbl() {
  //
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.adminView.booking);
  const allChecked = useSelector((state) => state.adminView.allChecked);
  const currentView = useSelector((state) => state.adminView.currentView);
  //
  useEffect(() => {
    const fetch = async () => {
      const data = await getHandler("/flight-bookings");
      // alert(JSON.stringify(data));
      dispatch(setCurrentView({ view: "bookings", data: [] }));
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
            {tblHeaderBooking.map((itm, ind) => {
              return (
                <th key={ind} className="th">
                  {itm}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {bookings &&
            bookings.map((item, ind) => {
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
                  <td className="py-1.125">{ind}</td>
                  <td className="py-1.125">{item.brandId}</td>
                  <td className="py-1.125">{"item.generic.name"}</td>
                  <td className="py-1.125">{item.available}</td>
                  <td className="py-1.125">
                    {item.strength + " " + "item.unit.name"}
                  </td>
                  <td className="py-1.125">{"item.formulation.name"}</td>
                  <td className="py-1.125">{"item.manufacturer"}</td>
                  {/* <TD2 txt={item.status} /> */}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
