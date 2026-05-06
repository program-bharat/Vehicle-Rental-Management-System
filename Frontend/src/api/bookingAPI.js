import axiosInstance from "./axios";

export const createBooking = (data) => {
    return axiosInstance.post("/bookings", data);
}

export const getBookings = () => {
    return axiosInstance.get("/bookings");
}

export const updateBookingStatus = (id, data) => {
    return axiosInstance.put(`/bookings/${id}`, data);
}