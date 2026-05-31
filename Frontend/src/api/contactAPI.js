import axiosInstance from "./axios";

export const sendContactMessage = async (data) => {
    const response = await axiosInstance.post("/contact", data);
    return response;
};

export const getAllContacts = async () => {
    const response = await axiosInstance.get("/contact");
    return response;
};

export const deleteContact = async (id) => {
    const response = await axiosInstance.delete(`/contact/${id}`);
    return response;
};