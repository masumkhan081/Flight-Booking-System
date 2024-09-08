import { createSlice } from "@reduxjs/toolkit";

export const adminViewSlice = createSlice({
  name: "adminView",
  initialState: {
    currentView: "flights",
    isModalVisible: false,
    isModalForEdit: false,
    modalData: {},
    expanded: "hidden",
    allChecked: false,
    flights: [],
    bookings: [],
  },
  
  reducers: {
    setCurrentView: (state, action) => {
      const { view, data } = action.payload;
      state.currentView = view;
      state[`${view}`] = data;
      state.expanded = state.expanded === "hidden" ? "block" : "block";
    },

    checkSingle: (state, action) => {
      console.log(action.payload);
      state = { ...state, currentView: action.payload };
    },
    checkAll: (state, action) => {
      console.log(action.payload);
      state = { ...state, currentView: action.payload };
    },
    initModal: (state, action) => {
      state.isModalVisible = action.payload.isModalVisible;
      state.isModalForEdit = action.payload.isModalForEdit;
    },
    closeModal: (state, action) => {
      console.log(
        "action.payload.isModalVisible: ",
        action.payload.isModalVisible
      );
      state.isModalVisible = action.payload.isModalVisible;
    },
    setModaldata: (state, action) => {
      console.log("setModaldata . .payload:   ", action.payload);
      state.modalData = action.payload;
    },
    setFlights: (state, action) => {
      console.log(
        "Flights: acation-payload:  " + JSON.stringify(action.payload)
      );
      state.flights = action.payload.data;
    },
    setBookings: (state, action) => {
      console.log(
        "Bookings: ---- acation-payload:  " + JSON.stringify(action.payload)
      );
      state.stock = action.payload.data;
    },

    deletHandler: (state, action) => {
      console.log(action.payload);
      // state.booklist = state.booklist.filter((book)=>{
      //   return book!== action.payload
      // })
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentView,
  checkSingle,
  checkAll,
  initModal,
  setModaldata,
  closeModal,
  setBookings,
  setFlights,
} = adminViewSlice.actions;
//
export default adminViewSlice.reducer;
