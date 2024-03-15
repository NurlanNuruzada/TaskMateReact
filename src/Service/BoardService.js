import { httpClient } from "../Utils/HttpClient";


export const CreateBoard = async (data) => {
    try {
        const result = await httpClient.post('/api/Boards/CreateBoard', data)
        return result
    } catch (error) {
        return error
    }
}

 
