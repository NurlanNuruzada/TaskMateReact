import { httpClient } from "../Utils/HttpClient";

export const CreateBoard = async (data) => {
  try {
    const result = await httpClient.post("/api/Boards/", data);
    return result;
  } catch (error) {
    return error;
  }
};

export const getByBoard = (id) => {
  return httpClient.get(`api/Boards/${id}`);
};
export const getbyWokrspaceInBoard = (id) => {
  return httpClient.get(`api/Boards?WorkspaceId=${id}`);
};

//https://localhost:7101/api/Boards/e94d0eb9-df9e-4222-58c7-08dc4536cb6c
//get ele
