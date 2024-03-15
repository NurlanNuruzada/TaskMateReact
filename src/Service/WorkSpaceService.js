import { httpClient } from "../Utils/HttpClient";

export const CreateWorkSpace = async (data) => {
    try {
        const response = await httpClient.post('/api/Workspaces', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const GetAllWorkspaces = async (data) => {
    try {
        const result = await httpClient.get(`/api/Workspaces/GetAllbyUserId?AppUserId=${data}`)
        return result
    }
    catch (error) {
        return error
    }
}