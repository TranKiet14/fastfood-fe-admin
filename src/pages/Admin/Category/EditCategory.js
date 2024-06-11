import { Button, Col, Form, Input, Modal, Radio, Row,  Spin, Tooltip, Upload, notification } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { useState } from "react"
import { PlusOutlined } from '@ant-design/icons';
import { getBase64 } from "../../../helpers/getBase64"
import { getCookie } from "../../../helpers/cookie";
import { editCategory } from "../../../service/Admin/categoryService";
function EditCategory (props) {
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
    const getFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    // Preview Image
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const handleCancelPreview = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    //End Preview Image
    const handleFinish = async (values) => {
        setSpinning(true);
        try {
            const accessToken = getCookie("access_token")
            await editCategory(accessToken, record._id, {
                title: values.title,
                description: values.description,
                thumbnail: values?.image?.[0]?.originFileObj,
                status: values.status
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
            <Modal title="Chỉnh sửa Món ăn" open={showModal} onCancel={handleCancle} footer={null}>
                <Spin spinning={spinning}>
                    <Form layout="vertical" form={form} initialValues={record} onFinish={handleFinish}>
                        <Row gutter={[20, 10]}>
                            <Col span={24}>
                                <Form.Item label="Tiêu đề" name={"title"} rules={rules}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Mô tả" name={"description"} >
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Upload" name='image' getValueFromEvent={getFile} valuePropName="fileList" initialValue={[
                                    {
                                        url: record.thumbnail
                                    }
                                ]}>
                                    <Upload
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        accept="image/*" listType="picture-card"
                                        multiple={false}
                                        onPreview={handlePreview}
                                        maxCount={1}
                                    >
                                        <button
                                            style={{
                                                border: 0,
                                                background: 'none',
                                            }}
                                            type="button"
                                        >
                                            <PlusOutlined />
                                            <div
                                                style={{
                                                    marginTop: 8,
                                                }}
                                            >
                                                Upload
                                            </div>
                                        </button>
                                    </Upload>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Trạng thái" name={"status"}>
                                    <Radio.Group>
                                        <Radio value="active"> Hoạt động </Radio>
                                        <Radio value="inactive"> Không hoạt động </Radio>
                                    </Radio.Group>
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
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelPreview}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    )
}
export default EditCategory