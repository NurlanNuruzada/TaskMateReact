import { httpClient } from "../Utils/HttpClient";

export const getCardInCustomFields = (cardId) => {
  return httpClient.get(`api/CustomFields?CardId=${cardId}`);
};
