import axiosInstance from "./axiosInstance";

export const joinEvent = (eventId) => {
  return axiosInstance.post(`/api/RSVP/${eventId}/join`);
};

export const leaveEvent = (eventId) => {
  return axiosInstance.post(`/api/RSVP/${eventId}/leave`);
};
