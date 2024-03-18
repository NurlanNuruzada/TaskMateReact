import { httpClient } from "../Utils/HttpClient";

export const getByCard = (id) => {
  return httpClient.get(`api/Cards/${id}`);
};


export const getCardDelete = (AppUserId, CardId) => {
  return httpClient.delete(`api/Cards?AppUserId=${AppUserId}&CardId=${CardId}`);
}