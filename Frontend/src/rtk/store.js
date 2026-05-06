import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import vehicleReducer from "./slices/vehicleSlice"
import bookingReducer from "./slices/bookingSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        vehicle: vehicleReducer,
        booking: bookingReducer,
    }
})