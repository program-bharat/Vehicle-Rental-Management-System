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

export const makeOwner = (id) => {
    return axiosInstance.put(`/users/make-owner/${id}`);
};

// VEHICLES
export const getPendingVehicles = () => {
    return axiosInstance.get("/vehicles/pending/all");
};

export const approveVehicle = (id) => {
    return axiosInstance.put(`/users/vehicles/${id}/approve`);
};