import axiosInstance from "./axios";

// Public
export const getPublicVehicles = (params) => {
    return axiosInstance.get("/vehicles/public", { params });
}
export const getVehicleDetails = (id) => {
    return axiosInstance.get(`/vehicles/${id}`);
}

// Owner
export const getOwnerVehicles = () => {
    return axiosInstance.get(`/vehicles`);
}
export const createVehicle = async (vehicleData) => {
    return axiosInstance.post(
        "/vehicles",
        vehicleData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
};
export const getOwnerVehicleDetails = (id) => {
    return axiosInstance.get(`/vehicles/owner/${id}`);
};
export const updateVehicle = (id, data) => {
    return axiosInstance.put(
        `/vehicles/${id}`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
}
export const deleteVehicle = (id) => {
    return axiosInstance.delete(`/vehicles/${id}`);
}
export const toggleAvailability = (id) => {
    return axiosInstance.put(`/vehicles/${id}/availability`);
}