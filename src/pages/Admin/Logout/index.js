/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { deleteAllCookies, getCookie } from "../../../helpers/cookie";
import { logoutFailed, logoutStart, logoutSuccess } from "../../../redux/authSlice";
import { logout } from "../../../service/Admin/accountService";

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const accessToken = getCookie("access_token");
    useEffect(() => {
        dispatch(logoutStart());
        const fetchApi = async () => {
            try {
                await logout(accessToken);
                dispatch(logoutSuccess());
                deleteAllCookies();
                navigate("/");
            } catch (error) {
                dispatch(logoutFailed())
            }
        }
        fetchApi();
    }, [])
    return (
        <></>
    )
}
export default Logout