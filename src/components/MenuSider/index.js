import { Menu } from "antd"
import { GiChickenOven } from "react-icons/gi";
import { IoFastFoodOutline } from "react-icons/io5";
import { LiaShippingFastSolid, LiaUserCogSolid } from "react-icons/lia";
import { DashboardOutlined, UserOutlined, UnorderedListOutlined, FileDoneOutlined, TeamOutlined, KeyOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
function MenuSider() {
    const user = useSelector(state => state.auth.login.currentUser)
    let items = [
        {
            label: <Link to={""}>Tổng quan</Link>,
            icon: <DashboardOutlined />,
            key: "dashboard"
        }
    ];
    if (user && user?.role?.permissions.includes("foods_view")) {
        items.push(
            {
                label: <Link to={"food"}>Quản lý món ăn</Link>,
                icon: <GiChickenOven />,
                key: "food-manager"
            }
        )
    }
    if (user && user?.role?.permissions.includes("combos_view")) {
        items.push(
            {
                label: <Link to={"combo"}>Quản lý Combo</Link>,
                icon: <IoFastFoodOutline />,
                key: "combo-manager"
            }
        )
    }
    if (user && user?.role?.permissions.includes("foods-category_view")) {
        items.push(
            {
                label: <Link to={"category"}>Quản lý danh mục</Link>,
                icon: <UnorderedListOutlined />,
                key: "category-manager"
            }
        )
    }
    if (user && user?.role?.permissions.includes("roles_view")) {
        items.push(
            {
                label: <Link to={"role"}>Quản lý nhóm quyền</Link>,
                icon: <FileDoneOutlined />,
                key: "role-manager"
            }
        )
    }
    if (user && user?.role?.permissions.includes("roles_permissions")) {
        items.push(
            {
                label: <Link to={"permission"}>Phân quyền</Link>,
                icon: <KeyOutlined />,
                key: "permission"
            }
        )
    }
    if (user && user?.role?.permissions.includes("accounts_view")) {
        items.push(
            {
                label: "Quản lý người dùng",
                icon: <TeamOutlined />,
                key: "account-manager",
                children: [
                    {
                        label: <Link to={"account/client"}>Khách hàng</Link>,
                        icon: <UserOutlined />,
                        key: "client-manager",
                    },
                    {
                        label: <Link to={"account/shipper"}>Nhân viên giao hàng</Link>,
                        icon: <LiaShippingFastSolid />,
                        key: "shipper-manager",
                    },
                    {
                        label: <Link to={"account/admin-staff"}>Nhân viên quản trị</Link>,
                        icon: <LiaUserCogSolid />,
                        key: "admin-manager",
                    },
                ]
            }
        )
    }
    return (
        <>
            <Menu items={items} mode="inline" defaultSelectedKeys={["dashboard"]}>

            </Menu>
        </>
    )
}
export default MenuSider