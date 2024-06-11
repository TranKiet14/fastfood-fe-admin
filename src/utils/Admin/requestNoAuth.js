import axios from "axios"
const API_DOMAIN_ADMIN = "http://localhost:4000/api/v1/admin/";

const requestNoAuth = axios.create({
    baseURL: API_DOMAIN_ADMIN
});

requestNoAuth.defaults.withCredentials = true
export default requestNoAuth