import { useEffect, useState } from "react"
import { getCookie } from "../../../helpers/cookie";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons"
import { getRoles } from "../../../service/Admin/roleService"
import TableRole from "./TableRole";
function Role() {
    const [roles, setRoles] = useState();
    const user = useSelector(state => state.auth.login.currentUser)
    const fetchApi = async () => {
        try {
            const accessToken = getCookie("access_token")
            const res = await getRoles(accessToken);
            setRoles(res)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchApi()
    }, [])
    const handleReload = () => {
        fetchApi()
    }
    return (
        <>
            {(user && (user?.role?.permissions.includes("roles_view"))) ? (
                <>
                    <h1>Danh sách quyền</h1>
                    {user?.role?.permissions.includes("roles_create") && (
                        <Link to="/admin/create-role">
                            <Button size="large" icon={<PlusOutlined />}>Tạo mới</Button>
                        </Link>
                    )}
                    <TableRole roles = {roles} onReload={handleReload} />
                </>
            ) : (
                <>
                    <Navigate to="/admin" />
                </>
            )}
        </>
    )
}
export default Role