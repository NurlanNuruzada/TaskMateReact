import { httpClient } from "../Utils/HttpClient";

export const CreateWorkSpace = async (data) => {
    try {
        const response = await httpClient.post('/api/Workspaces', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const GetAllWorkspaces = async (AppUserId) => {
    try {
        const result = await httpClient.get(`/api/Workspaces/GetAllbyUserId?AppUserId=${AppUserId}`)
        return result
    }
    catch (error) {
        return error
    }
}
export const GetWorkSpaceById = async (WorkspaceId) => {
    try {
        const result = await httpClient.get(`/api/Workspaces/${WorkspaceId}`)
        return result
    }
    catch (error) {
        return error
    }
}


