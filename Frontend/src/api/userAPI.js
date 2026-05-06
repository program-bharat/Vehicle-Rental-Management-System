import axiosInstance from "./axios";

// Admin
export const getAllUsers = () => {
    return axiosInstance.get("/users");
}
export const deleteUser = (id) => {
    return axiosInstance.delete(`/users/${id}`);
}
export const verifyUser = (id) => {
    return axiosInstance.put(`/users/verify/${id}`);
}
export const approveVehicle = (id) => {
    return axiosInstance.put(`/users/approveVehicle/${id}`);
}
export const makeOwner = (id) => {
    return axiosInstance.put(`/users/make-owner/${id}`);
}

// Owner Analytics
export const getOwnerAnalytics = () => {
    return axiosInstance.get("/users/owner/analytics")
}
