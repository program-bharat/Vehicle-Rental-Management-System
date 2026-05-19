import axiosInstance from "./axios";

// Admin
export const getAllUsers = () => {
    return axiosInstance.get("/users");
}
// PROFILE
export const getMyProfile = () => {
    return axiosInstance.get("/users/profile/me");
};
export const updateProfile = (data) => {
    return axiosInstance.put("/users/profile/update", data);
};
export const deleteUser = (id) => {
    return axiosInstance.delete(`/users/${id}`);
}
export const verifyUser = (id) => {
    return axiosInstance.put(`/users/${id}/verify`);
}
export const approveVehicle = (id) => {
    return axiosInstance.put(`/users/vehicles/${id}/approve`);
}
export const makeOwner = (id) => {
    return axiosInstance.put(`/users/make-owner/${id}`);
}

// Owner Analytics
export const getOwnerAnalytics = async () => {
    return axiosInstance.get("/users/owner/analytics");
}
