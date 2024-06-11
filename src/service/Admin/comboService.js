import  request  from "../../utils/Admin/request";

export const getCombos = async (access_token) => {
    const response = await request.get("/combos", {
        headers: {
            'Authorization': `Bearer ${access_token}`
        } 
    });
    return response.data
}

export const detailCombo = async (access_token, id) => {
    const response = await request.get(`/combos/detail/${id}`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        } 
    });
    return response.data
}

export const deleteCombo = async (access_token, id) => {
    const response = await request.patch(`/combos/delete/${id}`,{}, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        } 
    });
    return response.data
}

export const editCombo = async (access_token, id, options) => {
    const response = await request.patch(`/combos/edit/${id}`, options, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'multipart/form-data'
        } 
    });
    return response.data
}

export const createCombo = async (access_token, options) => {
    const response = await request.post(`/combos/create`, options, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'multipart/form-data'
        } 
    });
    return response.data
}