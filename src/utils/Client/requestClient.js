import axios from "axios"
import { getCookie} from "../../helpers/cookie"
const API_DOMAIN_CLIENT = "http://localhost:4000/api/v1/client/";
const accessToken = getCookie("access_token")
export const request = axios.create({
    baseURL: API_DOMAIN_CLIENT,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
});
export const formDataRequest = axios.create({
    baseURL: API_DOMAIN_CLIENT,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`
    }
});

