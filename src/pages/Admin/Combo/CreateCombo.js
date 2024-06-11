import { Button, Card, Col, Form, Input, Modal, Radio, Row, Select, Spin, Upload, notification } from "antd"
import { useEffect, useState } from "react"
import { PlusOutlined } from '@ant-design/icons';
import { getBase64 } from "../../../helpers/getBase64"
import { getCookie } from "../../../helpers/cookie";
import GoBack from "../../../components/GoBack";
import ListFoods from "./ListFood";
import { createCombo } from "../../../service/Admin/comboService";
import { getCategories } from "../../../service/Admin/categoryService";
const { Meta } = Card;
function CreateCombo() {
    const [listFoods, setListFoods] = useState([]);
    const [form] = Form.useForm()
    const [notificationApi, contextHolder] = notification.useNotification();
    const [spinning, setSpinning] = useState(false);
    const rules = [
        {
            required: true,
            message: 'Bắt buộc',
        },
    ]
    const handleResetForm = () => {
        form.resetFields();
    }
    const getFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
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
    const setDataFoods = (data) => {
        setListFoods(data);
    }
    const handleFinish = async (values) => {
        setSpinning(true);
        let newListFoods = [];
        for (const item of listFoods) {
            newListFoods.push({
                _id: item._id,
                quantity: item.quantity
            })
        }
        try {
            const accessToken = getCookie("access_token")
            await createCombo(accessToken, {
                title: values.title,
                price: values.price,
                description: values.description,
                thumbnail: values?.image?.[0]?.originFileObj,
                listFoods: newListFoods,
                status: values.status,
                category: values.category
            })
            setListFoods([])
            handleResetForm();
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
                            <Card title="Danh sách món ăn trong Combo" extra={<ListFoods listFoods={listFoods} setDataFoods={setDataFoods} />}>
                                <Row gutter={[20, 10]}>
                                    {(listFoods).map((item, index) => (
                                        <Col span={6} key={index}>
                                            <Card
                                                hoverable
                                                cover={<img alt="example" src={item.thumbnail} />}
                                            >
                                                <Meta title={item.quantity + " x " + item.title} description={"Đơn giá: " + item.price + " VND"} />
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Mô tả" name={"description"} >
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Giá" name={"price"} rules={rules}>
                                <Input />
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
                        <Col span={2}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Cập nhật</Button>
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Form.Item>
                                <Button onClick={handleResetForm} >Làm mới</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
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
export default CreateCombo