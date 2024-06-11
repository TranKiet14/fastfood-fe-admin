import  request  from "../../utils/Admin/request";

export const getCategories = async (access_token) => {
    const response = await request.get("/food-category", {
        headers: {
            'Authorization': `Bearer ${access_token}`
        } 
    });
    return response.data
}

export const deleteCategory = async (access_token, id) => {
    const response = await request.patch(`/food-category/delete/${id}`,{}, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        } 
    });
    return response.data
}

export const editCategory = async (access_token, id, options) => {
    const response = await request.patch(`/food-category/edit/${id}`, options, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'multipart/form-data'
        } 
    });
    return response.data
}

export const createCategory = async (access_token, options) => {
    const response = await request.post(`/food-category/create`, options, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'multipart/form-data'
        } 
    });
    return response.data
}