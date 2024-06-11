import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { getCookie } from "../../helpers/cookie"
function PrivateRoutesAdmin() {
    const user = useSelector(state => state.auth.login.currentUser)
    const accessToken = getCookie("access_token")
    return (
        <>
            { (accessToken && (user?.role?.permissions?.includes("foods_view"))) ? (<Outlet />) : <Navigate to="/login-admin" /> }
        </>
    )

}
export default PrivateRoutesAdmin