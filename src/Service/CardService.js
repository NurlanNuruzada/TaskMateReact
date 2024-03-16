import { httpClient } from "../Utils/HttpClient";

export const getByCard = (id) => {
  return httpClient.get(`api/Cards/${id}`);
};
