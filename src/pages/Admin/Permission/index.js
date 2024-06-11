import { useEffect, useState } from "react"
import { getCookie } from "../../../helpers/cookie";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Button, Checkbox, Spin, notification } from "antd";
import { editRole, getRoles } from "../../../service/Admin/roleService"
// import "bootstrap/dist/css/bootstrap.min.css";
import './Permission.scss'
function Permission() {
    const [roles, setRoles] = useState();
    const [spinning, setSpinning] = useState(false);
    const [notificationApi, contextHolder] = notification.useNotification();
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
    const handleChange = (id, permission) => (e) => {
        const updatedRoles = [...roles];
        for (const item of updatedRoles) {
            if (item._id === id) {
                item.permissions.includes(permission) ? item.permissions = item.permissions.filter(item => item !== permission) : item.permissions.push(permission)
            }
        }
        setRoles(updatedRoles);

    }
    const handleClick = async () => {
        setSpinning(true);
        try {
            for (const item of roles) {
                const accessToken = getCookie("access_token")
                await editRole(accessToken, item._id, {
                    permissions: item.permissions
                })
            }
            handleReload()
            setSpinning(false)
            notificationApi.success({
                message: "Cập nhật thành công",
                duration: 3
            })
        } catch (error) {
            console.log(error)
            setSpinning(false)
            notificationApi.error({
                message: "Cập nhật không thành công",
                duration: 3
            })
        }

    }
    return (
        <>
            {(user && (user?.role?.permissions.includes("roles_permissions"))) ? (
                <>
                    {contextHolder}
                    <h1>Phân quyền</h1>
                    <Spin spinning={spinning}>
                        <Button type="primary" onClick={handleClick}>Cập nhật</Button>
                        <table className="table">
                            <thead >
                                <tr>
                                    <td ><h3>Tính năng</h3> </td>
                                    {roles && roles.map((item, index) => (
                                        <th className="text-center" key={index}>{item.title}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td ><b>Danh mục</b></td>
                                </tr>
                                <tr>
                                    <td>Xem</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox checked={item.permissions.includes("foods-category_view")} onChange={handleChange(item._id, "foods-category_view")} ></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Thêm mới</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox checked={item.permissions.includes("foods-category_create")} onChange={handleChange(item._id, "foods-category_create")}></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Chỉnh sửa</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox onChange={handleChange(item._id, "foods-category_edit")} checked={item.permissions.includes("foods-category_edit")}></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Xóa</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox onChange={handleChange(item._id, "foods-category_delete")} checked={item.permissions.includes("foods-category_delete")}></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td><b>Món ăn</b></td>
                                </tr>
                                <tr>
                                    <td>Xem</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox onChange={handleChange(item._id, "foods_view")} checked={item.permissions.includes("foods_view")}></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Thêm mới</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox onChange={handleChange(item._id, "foods_create")} checked={item.permissions.includes("foods_create")}></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Chỉnh sửa</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox onChange={handleChange(item._id, "foods_edit")} checked={item.permissions.includes("foods_edit")}></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Xóa</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox onChange={handleChange(item._id, "foods_delete")} checked={item.permissions.includes("foods_delete")}></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td><b>Combo</b></td>
                                </tr>
                                <tr>
                                    <td>Xem</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox onChange={handleChange(item._id, "combos_view")} checked={item.permissions.includes("combos_view")}></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Thêm mới</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox onChange={handleChange(item._id, "combos_create")} checked={item.permissions.includes("combos_create")}></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Chỉnh sửa</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox onChange={handleChange(item._id, "combos_edit")} checked={item.permissions.includes("combos_edit")}></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Xóa</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox onChange={handleChange(item._id, "combos_delete")} checked={item.permissions.includes("combos_delete")}></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td><b>Nhóm quyền</b></td>
                                </tr>
                                <tr>
                                    <td>Xem</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox onChange={handleChange(item._id, "roles_view")} checked={item.permissions.includes("roles_view")}></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Thêm mới</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox onChange={handleChange(item._id, "roles_create")} checked={item.permissions.includes("roles_create")}></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Chỉnh sửa</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox onChange={handleChange(item._id, "roles_edit")} checked={item.permissions.includes("roles_edit")}></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Phân quyền</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox onChange={handleChange(item._id, "roles_permissions")} checked={item.permissions.includes("roles_permissions")}></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td><b>Tài khoản</b></td>
                                </tr>
                                <tr>
                                    <td>Xem</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox onChange={handleChange(item._id, "accounts_view")} checked={item.permissions.includes("accounts_view")}></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Thêm mới</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox onChange={handleChange(item._id, "accounts_create")} checked={item.permissions.includes("accounts_create")}></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Chỉnh sửa</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox onChange={handleChange(item._id, "accounts_edit")} checked={item.permissions.includes("accounts_edit")}></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Xóa</td>
                                    {roles && roles.map((item, index) => (
                                        <td className="text-center" key={index}>
                                            <Checkbox onChange={handleChange(item._id, "accounts_delete")} checked={item.permissions.includes("accounts_delete")}></Checkbox>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </Spin>
                </>
            ) : (
                <>
                    <Navigate to="/admin" />
                </>
            )}
        </>
    )
}
export default Permission