import React, { useEffect } from "react";
import {
  tblHeaderFlight,
  tblHeaderUser,
  tblOptions,
} from "../../static-data/table";
import { useDispatch, useSelector } from "react-redux";
import {
  checkSingle,
  checkAll,
  setCurrentView,
} from "../../redux/slices/adminView";
import { getHandler } from "../../util/handler";
import { getDateTime } from "../../util/time";
import { FaInfo } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

export default function UserTbl() {
  //
  const dispatch = useDispatch();
  const users = useSelector((state) => state.adminView.users);
  const allChecked = useSelector((state) => state.adminView.allChecked);
  const currentView = useSelector((state) => state.adminView.currentView);
  //
  useEffect(() => {
    const fetch = async () => {
      const data = await getHandler("/users");
      dispatch(setCurrentView({ view: "users", data: data?.data?.data?.data }));
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
            {tblHeaderUser.map((itm, ind) => {
              return (
                <th key={ind} className="th">
                  {itm}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {users &&
            users.map((item, ind) => {
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
                  <td className="py-1.125">{item.fullName}</td>
                  <td className="py-1.125">{item.email}</td>
                  <td className="py-1.125">{item.phone}</td>

                  {/* <td className="py-1.125">{item?.totalBooking}</td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
