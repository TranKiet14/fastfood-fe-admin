import { Button, Col, Form, Input, Modal, Radio, Row, Select, Spin, Tooltip, Upload, notification } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { PlusOutlined } from '@ant-design/icons';
import { getBase64 } from "../../../helpers/getBase64"
import { getCategories } from "../../../service/Admin/categoryService"
import { getCookie } from "../../../helpers/cookie";
import { editFood } from "../../../service/Admin/foodService";
function EditFood(props) {
    const { record, onReload } = props
    record.categoryTitle = {
        value: record?.category?._id,
        label: record?.category?.title
    }
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
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const accessToken = getCookie("access_token")
                const res = await getCategories(accessToken);
                let result = [];
                for (const item of res) {
                    result.push({
                        value: item._id,
                        label: item.title
                    })
                }
                setCategories(result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchApi();
    }, [])
    const handleFinish = async (values) => {
        setSpinning(true);
        let image = undefined;
        if(values.categoryTitle.value){
            values.categoryTitle = undefined
        }
        if (!values?.image?.[0]?.url){
            image = values?.image?.[0]?.originFileObj
        }
        try {
            const accessToken = getCookie("access_token")
            await editFood(accessToken, record._id, {
                title: values.title,
                category: values.categoryTitle,
                description: values.description,
                price: values.price,
                discountPercentage: values.discountPercentage,
                thumbnail: image,
                status: values.status
            });
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
                                <Form.Item label="Danh mục" name={"categoryTitle"} rules={rules} >
                                    <Select options={categories} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Mô tả" name={"description"} >
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Giá" name={"price"} rules={rules}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Giảm giá" name={"discountPercentage"} rules={rules}>
                                    <Input />
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
export default EditFood