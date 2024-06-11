import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function Dashboard () {
    const user = useSelector(state => state.auth.login.currentUser)
    return (
        <>
            {(user && (user && (user.role.title === "Quản trị viên" || user.role.title === "Nhân viên quản lý"))) ? (
                <>
                    Dashboard
                </>
            ) : (
                <>
                    <Navigate to="/login-admin"/>
                </>
            )}

        </>
    )
}
export default Dashboard