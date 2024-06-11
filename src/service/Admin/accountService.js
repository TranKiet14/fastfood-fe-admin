import  request  from "../../utils/Admin/request"

export const detail = async (access_token) => {
    const response = await request.get("/accounts/detail", {
        headers: {
            'Authorization': `Bearer ${access_token}`
        } 
    });
    return response.data
}

export const logout = async (access_token) => {
    const response = await request.post("/accounts/logout", {} , {
        headers: {
            'Authorization': `Bearer ${access_token}`
        } 
    });
    return response.data
}

