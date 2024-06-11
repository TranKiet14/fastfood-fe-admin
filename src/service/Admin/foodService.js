import  request  from "../../utils/Admin/request";

export const getFoods = async (access_token) => {
    const response = await request.get("/foods", {
        headers: {
            'Authorization': `Bearer ${access_token}`
        } 
    });
    return response.data
}

export const detailFood = async (access_token, id) => {
    const response = await request.get(`/foods/detail/${id}`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        } 
    });
    return response.data
}

export const deleteFood = async (access_token, id) => {
    const response = await request.patch(`/foods/delete/${id}`,{}, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        } 
    });
    return response.data
}

export const editFood = async (access_token, id, options) => {
    const response = await request.patch(`/foods/edit/${id}`, options, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'multipart/form-data'
        } 
    });
    return response.data
}

export const changeMulti = async (access_token, options) => {
    const response = await request.patch(`/foods/change-multi`, options, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        } 
    });
    return response.data
}

export const createFood = async (access_token, options) => {
    const response = await request.post(`/foods/create`, options, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'multipart/form-data'
        } 
    });
    return response.data
}