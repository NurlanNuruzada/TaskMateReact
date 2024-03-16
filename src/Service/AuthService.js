import { httpClient } from "../Utils/HttpClient";

export const login = (data) => {
    console.log(data);
    return httpClient.post('api/Auth/Login', data);
};

export const CreateUser = (data) => {
    return httpClient.post('api/AppUser/CreateUser', data);
};
