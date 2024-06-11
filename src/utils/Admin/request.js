import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { getCookie, setCookie } from "../../helpers/cookie";
const API_DOMAIN_ADMIN = "http://localhost:4000/api/v1/admin/";
const API_REFRESH_TOKEN = "http://localhost:4000/api/v1/token/refreshToken";
const request = axios.create({
    baseURL: API_DOMAIN_ADMIN
});
request.defaults.withCredentials = true;
const refreshToken = async () => {
    try {
        const res = await axios.post(API_REFRESH_TOKEN, {}, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}
request.interceptors.request.use(
    async (config) => {
        const access_token = getCookie("access_token");
        let date = new Date();
        const decodeToken = jwtDecode(access_token);
        if(decodeToken.exp < date.getTime() /1000){
            const data = await refreshToken();
            setCookie("access_token", data.access_token, 365);
            config.headers["Authorization"] = `Bearer ${data.access_token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default request

