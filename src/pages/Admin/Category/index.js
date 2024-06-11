import { useEffect, useState } from "react"
import { getCookie } from "../../../helpers/cookie";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons"
import { getCategories } from "../../../service/Admin/categoryService";
import TableCategory from "./TableCategory";
function Category() {
    const [categories, setCategories] = useState();
    const user = useSelector(state => state.auth.login.currentUser)
    const fetchApi = async () => {
        try {
            const accessToken = getCookie("access_token")
            const res = await getCategories(accessToken);
            setCategories(res)
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
            {(user && (user?.role?.permissions.includes("foods-category_view"))) ? (
                <>
                    <h1>Danh sách các danh mục</h1>
                    {user?.role?.permissions.includes("foods-category_create") && (
                        <Link to="/admin/create-category">
                            <Button size="large" icon={<PlusOutlined />}>Tạo mới</Button>
                        </Link>
                    )}
                    <TableCategory categories={categories} onReload={handleReload} />
                </>
            ) : (
                <>
                    <Navigate to="/admin" />
                </>
            )}
        </>
    )
}
export default Category