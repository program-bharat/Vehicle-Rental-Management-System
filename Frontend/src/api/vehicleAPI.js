import axiosInstance from "./axios";

// Public
export const getPublicVehicles = (params) => {
    return axiosInstance.get("/vehicles/public", { params });
}
export const getVehicleDetails = (id) => {
    return axiosInstance.get(`/vehicles/${id}`);
}

// Owner
export const getOwnerVehicles = (id) => {
    return axiosInstance.get(`/vehicles`);
}
export const createVehicle = (data) => {
    return axiosInstance.post("/vehicles", data);
}
export const updateVehicle = (id, data) => {
    return axiosInstance.put(`/vehicles/${id}`, data);
}
export const deleteVehicle = (id) => {
    return axiosInstance.delete(`/vehicles/${id}`);
}
export const toggleAvailability = (id) => {
    return axiosInstance.put(`/vehicles/${id}/availability`);
}