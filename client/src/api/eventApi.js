// src/api/eventApi.js
import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getAllEvents = () => {
  return axiosInstance.get("/api/events");
};

export const getMyEvents = () => {
  return axiosInstance.get("/api/events/my-events");
};

export const createEvent = (formData) => {
    console.log("inise a[i before calling", formData)
  return axiosInstance.post("/api/events", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateEvent = (id, formData) => {
  return axiosInstance.put(`/api/events/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }, 
  });
};

export const deleteEvent = (id) => {
  return axiosInstance.delete(`/api/events/${id}`);
};

export const getEventById = (id) =>{
     return axiosInstance.get(`/api/events/${id}`);
}
export const getJoinedEvents = () => {
  return axiosInstance.get("/api/events/joined-events");
};

