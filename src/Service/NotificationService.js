import { httpClient } from "../Utils/HttpClient";

export const getUserAllNotifications = (AppUserId) => {
    return httpClient.get(`/api/Notifactions/UserGetAllNotifactions?AppUserId=${AppUserId}`);
};