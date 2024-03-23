import { httpClient } from "../Utils/HttpClient";

export const getByToken = (tokenId) => {
  return httpClient.get(`api/Token/GetToken?TokenId=${tokenId}`);
};
