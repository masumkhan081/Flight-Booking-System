import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    fullName: "",
    email: "",
    id: "",
    role: "",
    authenticated: false,
    emailVerification: {
      otp: "",
      token: "",
      email: "",
    },
  },
  reducers: {
    setOtp(state, action) {
      state.emailVerification.otp = action.payload.otp;
      state.emailVerification.token = action.payload.token;
      state.emailVerification.email = action.payload.email;
    },

    setLoading(state, action) {
      state.loading = true;
    },

    setUser: (state, action) => {
      const { role, email, phone, fullName, authenticated } = action.payload;
      state.email = email;
      state.role = role;
      state.phone = phone;
      state.fullName = fullName;
      state.authenticated = authenticated;
      state.loading = false;
    },
    resetUser: (state, action) => {
      state.email = "";
      state.role = "";
      state.phone = "";
      state.fullName = "";
      state.authenticated = false;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, resetUser, setLoading, setOtp } = userSlice.actions;

export default userSlice.reducer;
