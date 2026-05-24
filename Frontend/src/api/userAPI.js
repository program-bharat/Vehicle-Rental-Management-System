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
export const changePassword = (data) => {
    return axiosInstance.put("/users/profile/change-password", data);
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
export const requestOwnerRole = () => {
    return axiosInstance.put("/users/request-owner");
};
export const markOwnerRequestSeen = async () => {
    return axiosInstance.put("/users/owner-request/seen");
};
// Owner Analytics
export const getOwnerAnalytics = async () => {
    return axiosInstance.get("/users/owner/analytics");
}
// Admin Analytics
export const getAdminDashboardStats = () => {
    return axiosInstance.get("/users/dashboard");
};