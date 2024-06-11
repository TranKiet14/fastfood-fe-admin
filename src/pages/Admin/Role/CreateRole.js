import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { useState } from "react"
import { Button, Col, Form, Input, Row, Spin, notification } from "antd"
import GoBack from "../../../components/GoBack"
import { createRole } from "../../../service/Admin/roleService"
import { getCookie } from "../../../helpers/cookie"
function CreateRole () {
    const [form] = Form.useForm()
    const user = useSelector(state => state.auth.login.currentUser)
    const [notificationApi, contextHolder] = notification.useNotification();
    const [spinning, setSpinning] = useState(false);
    const rules = [
        {
            required: true,
            message: 'Bắt buộc',
        },
    ]
    const handleFinish = async (values) => {
        setSpinning(true);
        try {
            const accessToken = getCookie("access_token");
            await createRole(accessToken, {
                title: values.title,
                description: values.description
            });
            setSpinning(false)
            form.resetFields()
            notificationApi.success({
                message: "Tạo thành công",
                duration: 3
            })
        } catch (error) {
            console.log(error)
            setSpinning(false)
            notificationApi.error({
                message: "Tạo không thành công",
                duration: 3
            })
        }
    }
    return (
        <>
            {(user && (user?.role?.permissions.includes("roles_create"))) ? (
                <>
                    {contextHolder}
                    <GoBack />
                    <Spin spinning={spinning}>
                        <Form layout="vertical" form={form} onFinish={handleFinish}>
                            <Row gutter={[20, 10]}>
                                <Col offset={2} span={12}>
                                    <Form.Item label="Tiêu đề" name={"title"} rules={rules}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col offset={2} span={12}>
                                    <Form.Item label="Mô tả ngắn" name={"description"} >
                                        <Input.TextArea rows={4} />
                                    </Form.Item>
                                </Col>
                                <Col offset={2} span={24}>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">Tạo mới</Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Spin>
                </>
            ) : (
                <>
                    <Navigate to="/admin/role" />
                </>
            )}
        </>
    )
}
export default CreateRole