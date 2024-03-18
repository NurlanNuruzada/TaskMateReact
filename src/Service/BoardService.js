import { httpClient } from "../Utils/HttpClient";

export const CreateBoard = async (data) => {
  try {
    const result = await httpClient.post("/api/Boards/CreateBoard", data);
    return result;
  } catch (error) {
    return error;
  }
};
export const UpdateBoard = async (data) => {
  try {
    const result = await httpClient.put("/api/Boards", data);
    return result;
  } catch (error) {
    return error;
  }
};

export const getByBoard = (id) => {
  return httpClient.get(`api/Boards/${id}`);
};
export const getbyWokrspaceInBoard = (AppUserId, WorkspaceId) => {
  return httpClient.get(`api/Boards?AppUserId=${AppUserId}&WorkspaceId=${WorkspaceId}`);
};
export const getDeletebyId = async (AppUserId, BoardId) => {
  try {
    const result = await httpClient.delete(`/api/Boards/Remove?AppUserId=${AppUserId}&BoardId=${BoardId}`)
    return result
  }
  catch (error) {
    return error
  }
}


//https://localhost:7101/api/Boards/e94d0eb9-df9e-4222-58c7-08dc4536cb6c
//get ele
