import PrivateRoutesAdmin from "../components/PrivateRoutesAdmin";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Dashboard from "../pages/Admin/Dashboard";
import Food from "../pages/Admin/Food";
import Combo from "../pages/Admin/Combo";
import Category from "../pages/Admin/Category";
import Role from "../pages/Admin/Role";
import Permission from "../pages/Admin/Permission";
import AccountAdmin from "../pages/Admin/AccountAdmin";
import AccountShipper from "../pages/Admin/AccountShipper";
import AccountClient from "../pages/Admin/AccountClient";
import Login from "../pages/Admin/Login";
import Logout from "../pages/Admin/Logout";
import CreateFood from "../pages/Admin/Food/CreateFood";
import CreateCategory from "../pages/Admin/Category/CreateCategory";
import CreateRole from "../pages/Admin/Role/CreateRole";
import EditCombo from "../pages/Admin/Combo/EditCombo";
import CreateCombo from "../pages/Admin/Combo/CreateCombo";

export const routes = [
    {
        children: [
            {
                path: "/login-admin",
                element: <Login />
            },
            {
                path: "/logout",
                element: <Logout />,
            },
            {
                element: <PrivateRoutesAdmin />,
                children: [
                    {
                        path: "/admin",
                        element: <LayoutAdmin />,
                        children: [
                            {
                                path: "",
                                element: <Dashboard />
                            },
                            {
                                path: "food",
                                element: <Food />,
                            },
                            {
                                path: "create-food",
                                element: <CreateFood />
                            },
                            {
                                path: "combo",
                                element: <Combo />
                            },
                            {
                                path: "create-combo",
                                element: <CreateCombo />
                            },
                            {
                                path: "edit-combo/:id",
                                element: <EditCombo />
                            },
                            {
                                path: "category",
                                element: <Category />
                            },
                            {
                                path: "create-category",
                                element: <CreateCategory />
                            },
                            {
                                path: "role",
                                element: <Role />
                            },
                            {
                                path: "create-role",
                                element: <CreateRole />
                            },
                            {
                                path: "permission",
                                element: <Permission />
                            },
                            {
                                path: "account/admin-staff",
                                element: <AccountAdmin />
                            },
                            {
                                path: "account/shipper",
                                element: <AccountShipper />
                            },
                            {
                                path: "account/client",
                                element: <AccountClient />
                            }
                        ]
                    }
                ]
            }
        ]
    }
];