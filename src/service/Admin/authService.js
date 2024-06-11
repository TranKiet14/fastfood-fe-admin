import  requestNoAuth  from "../../utils/Admin/requestNoAuth"

export const login = async (options) => {
    const response = await requestNoAuth.post("/accounts/login", options)
    return response.data;
}
