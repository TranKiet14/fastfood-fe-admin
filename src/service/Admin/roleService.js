import  request  from "../../utils/Admin/request";

export const getRoles = async (access_token) => {
    const response = await request.get("/roles", {
        headers: {
            'Authorization': `Bearer ${access_token}`
        } 
    });
    return response.data
}


export const editRole = async (access_token, id, options) => {
    const response = await request.patch(`/roles/edit/${id}`, options, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        } 
    });
    return response.data
}

export const createRole = async (access_token, options) => {
    const response = await request.post(`/roles/create`, options, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        } 
    });
    return response.data
}