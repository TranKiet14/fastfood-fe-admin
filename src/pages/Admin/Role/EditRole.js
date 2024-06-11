import { Button, Col, Form, Input, Modal, Row,  Spin, Tooltip, notification } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { useState } from "react"
import { getCookie } from "../../../helpers/cookie"
import { editRole } from "../../../service/Admin/roleService"
function EditRole (props) {
    const { record, onReload } = props
    const [form] = Form.useForm()
    const [notificationApi, contextHolder] = notification.useNotification();
    const [spinning, setSpinning] = useState(false);
    const rules = [
        {
            required: true,
            message: 'Bắt buộc',
        },
    ]
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    }
    const handleCancle = () => {
        setShowModal(false);
        form.resetFields();
    }
    const handleFinish = async (values) => {
        setSpinning(true);
        try {
            const accessToken = getCookie("access_token")
            await editRole(accessToken, record._id, {
                title: values.title,
                description: values.description
            })
            setShowModal(false)
            onReload()
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
            {contextHolder}
            <Tooltip title="Chỉnh sửa" color="blue">
                <Button ghost type="primary" size="small" onClick={handleShowModal}><EditOutlined /></Button>
            </Tooltip>
            <Modal title="Chỉnh sửa Quyền" open={showModal} onCancel={handleCancle} footer={null}>
                <Spin spinning={spinning}>
                    <Form layout="vertical" form={form} initialValues={record} onFinish={handleFinish}>
                        <Row gutter={[20, 10]}>
                            <Col span={24}>
                                <Form.Item label="Tiêu đề" name={"title"} rules={rules}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Mô tả ngắn" name={"description"} >
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Cập nhật</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Spin>
            </Modal>
        </>
    )
}
export default EditRole