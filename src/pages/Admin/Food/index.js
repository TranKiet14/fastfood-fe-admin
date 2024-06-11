import { useEffect, useState } from "react"
import { changeMulti, getFoods } from "../../../service/Admin/foodService";
import { getCookie } from "../../../helpers/cookie";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Button, Card, Col, Form, Row, Select, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons"
import TableFood from "./TableFood";
function Food() {
    const [foods, setFoods] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [spinning, setSpinning] = useState(false);
    const [notificationApi, contextHolder] = notification.useNotification();
    const user = useSelector(state => state.auth.login.currentUser)
    const fetchApi = async () => {
        try {
            const accessToken = getCookie("access_token")
            const res = await getFoods(accessToken);
            setFoods(res)
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
    let actions = [];
    if (user?.role?.permissions.includes("foods_edit")) {
        actions.push(
            {
                value: "active",
                label: "Hoạt động"
            },
            {
                label: "Ngừng hoạt động",
                value: "inactive"
            }
        )
    }
    if(user?.role?.permissions.includes("foods_delete")) {
        actions.push(
            {
                label: "Xóa tất cả",
                value: "delete"
            }
        )
    }
    const handleFinishAction = async (values) => {
        if (values.action === undefined) {
            notificationApi.warning({
                message: "Vui lòng chọn hành động",
                duration: 3
            })
            return;
        }
        setSpinning(true);
        if (values.action === 'delete') {
            values.key = 'deleted';
            values.action = undefined
        } else {
            values.key = 'status'
        }
        try {
            const accessToken = getCookie("access_token")
            await changeMulti(accessToken, {
                ids: selectedItems,
                key: values.key,
                value: values?.action
            })
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
            {(user && (user?.role?.permissions.includes("foods_view"))) ? (
                <>
                    {contextHolder}
                    <h1>Danh sách các món ăn</h1>
                    <Card bordered={false}>
                        <Row justify="space-between" >
                            {user?.role?.permissions.includes("foods_edit") && (
                                <Col span={10}>
                                    <Form layout="inline" onFinish={handleFinishAction}>
                                        <Form.Item name={"action"}>
                                            <Select placeholder="-- Chọn hành động --" options={actions} />
                                        </Form.Item>
                                        <Button type="primary" htmlType="submit" loading={spinning}>Áp dụng</Button>
                                    </Form>
                                </Col>
                            )}
                            {user?.role?.permissions.includes("foods_create") && (
                                <Col span={4}>
                                    <Link to="/admin/create-food">
                                        <Button icon={<PlusOutlined />}>Tạo mới</Button>
                                    </Link>
                                </Col>
                            )}
                        </Row>
                    </Card>
                    <TableFood foods={foods} onReload={handleReload} setSelectedItems={setSelectedItems} />
                </>
            ) : (
                <>
                    <Navigate to="/admin" />
                </>
            )}
        </>
    )
}
export default Food