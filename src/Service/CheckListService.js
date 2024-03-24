import { useQueryClient } from "react-query";
import { httpClient } from "../Utils/HttpClient";
export const CreateChecklist = async (formData) => {
    try {
        const response = await httpClient.post('/api/Checklists', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const CreateChecklistitem = async (formData) => {
    try {
        const response = await httpClient.post('/api/Checkitems', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const UpdateChecklistItem = async (formData) => {
    try {
        const response = await httpClient.put('/api/Checkitems', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const GetAllChecklist = async (Id) => {
    try {
        const response = await httpClient.get(`/api/Checklists/GetAll?CardId=${Id}`)
        return response.data;
    } catch (error) {
    }
};
export const DeleteChecklistItem = async (Id) => {
    try {
        const response = await httpClient.delete(`/api/Checkitems?CheckItemId=${Id}`)
        return response.data;
    } catch (error) {
    }
};
export const DeleteChecklist = async (Id) => {
    try {
        const response = await httpClient.delete(`/api/Checklists?CheckListId=${Id}`)
        return response.data;
    } catch (error) {
    }
};


