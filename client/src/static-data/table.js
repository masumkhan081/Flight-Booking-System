const tblOptions = ["flights", "bookings", "users"];

const tblHeaderFlight = [
  "Flight Number",
  "Airline",
  "Dept. APT",
  "Arr. APT",
  "Dept. Time",
  "Arr. Time",
  "Duration",
  "Total Seats",
  "Available Seats",
  "Price",
  "Act.",
];

const tblHeaderBooking = [
  "Flight",
  "Psg Name",
  "Psg Email",
  "Psg Phone",
  "Num Of Sts",
  "Seats",
  "Book Date",
  "Status",
  "Tot Price",
  "Act.",
];
const tblHeaderUser = ["Name", "Email", "Phone"];

//
export { tblHeaderBooking, tblHeaderFlight, tblOptions, tblHeaderUser };
