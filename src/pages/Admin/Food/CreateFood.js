import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { getBase64 } from "../../../helpers/getBase64"
import { getCategories } from "../../../service/Admin/categoryService"
import { getCookie } from "../../../helpers/cookie";
import { useEffect,  useState } from "react"
import { Button, Col, Form, Input, InputNumber, Modal, Radio, Row, Select, Spin, Upload, notification } from "antd"
import GoBack from "../../../components/GoBack"
import { PlusOutlined } from '@ant-design/icons';
import { createFood } from "../../../service/Admin/foodService";

function CreateFood() {
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
        try {
            const accessToken = getCookie("access_token");
            await createFood(accessToken, {
                title: values.title,
                category: values.category,
                description: values.description,
                price: values.price,
                discountPercentage: values.discountPercentage,
                thumbnail: values?.image?.[0]?.originFileObj,
                status: values.status
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
            {(user && (user?.role?.permissions.includes("foods_create"))) ? (
                <>
                    {contextHolder}
                    <GoBack />
                    <Spin spinning={spinning}>
                        <Form layout="vertical" form={form} onFinish={handleFinish}>
                            <Row gutter={[20, 10]}>
                                <Col span={24}>
                                    <Form.Item label="Tiêu đề" name={"title"} rules={rules}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Danh mục" name={"category"} rules={rules} >
                                        <Select options={categories} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Mô tả" name={"description"} >
                                        <Input.TextArea rows={4} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Giá" name={"price"} rules={rules}>
                                        <InputNumber />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Giảm giá" name={"discountPercentage"} rules={rules}>
                                        <InputNumber />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Upload" name='image' getValueFromEvent={getFile} valuePropName="fileList" >
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
                                        <Button type="primary" htmlType="submit">Tạo mới</Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Spin>
                </>
            ) : (
                <>
                    <Navigate to="/admin/food" />
                </>
            )}
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
export default CreateFood
