import axiosInstance from "./axios";

// USERS
export const getAllUsers = () => {
    return axiosInstance.get("/users");
};

export const deleteUser = (id) => {
    return axiosInstance.delete(`/users/${id}`);
};

export const verifyUser = (id) => {
    return axiosInstance.put(`/users/${id}/verify`);
};

export const approveOwnerRequest = (id) => {
    return axiosInstance.put(`/users/owner-request/${id}/approve`);
};

export const rejectOwnerRequest = (id) => {
    return axiosInstance.put(`/users/owner-request/${id}/reject`);
};

// VEHICLES
export const getPendingVehicles = () => {
    return axiosInstance.get("/vehicles/pending/all");
};

export const approveVehicle = (id) => {
    return axiosInstance.put(`/users/vehicles/${id}/approve`);
};