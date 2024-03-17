import { httpClient } from "../Utils/HttpClient";

export const GetUserById = (id) => {
    return httpClient.get(`api/AppUser/GetById?id=${id}`);
};
export const SeachUsers = (value) => {
    return httpClient.get(`/api/AppUser/SearchUserByEmailorUsername?value=${value}`);
};