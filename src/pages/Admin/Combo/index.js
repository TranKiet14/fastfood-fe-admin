import { useEffect, useState } from "react";
import { getCookie } from "../../../helpers/cookie";
import { getCombos } from "../../../service/Admin/comboService";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons"
import TableCombo from "./TableCombo";

function Combo () {
    const [combos, setCombos] = useState([]);
    const user = useSelector(state => state.auth.login.currentUser)
    const fetchApi = async () => {
        try {
            const accessToken = getCookie("access_token")
            const res = await getCombos(accessToken);
            setCombos(res)
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
            {(user && (user?.role?.permissions.includes("combos_view"))) ? (
                <>
                    <h1>Danh sách các Combo</h1>
                    {user?.role?.permissions.includes("combos_create") && (
                        <Link to="/admin/create-combo">
                            <Button size="large" icon={<PlusOutlined />}>Tạo mới</Button>
                        </Link>
                    )}
                    <TableCombo combos={combos} onReload={handleReload} />
                </>
            ) : ( 
                <>
                    <Navigate to="/admin"/>
                </>
            )}
        </>
    )
}
export default Combo