import { Button, Card, Col, Form, Input, Row, Spin } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import useMessage from "antd/es/message/useMessage";
import { setCookie } from '../../../helpers/cookie'
import "./Login.scss"
import { login } from "../../../service/Admin/authService";
import { loginStart, loginSuccess, loginFailed } from "../../../redux/authSlice";
import { useDispatch } from "react-redux";
import { detail } from "../../../service/Admin/accountService";

function Login() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = useMessage();
    const dispatch = useDispatch();
    const getUser = async (access_token) => {
        try {
            const res = await detail(access_token);
            return res.data
        } catch (error) {
            dispatch(loginFailed())
        }
    }
    const handleFinish = async (values) => {
        setLoading(true);
        dispatch(loginStart());
        try {
            const res = await login({
                email: values.email,
                password: values.password
            })
            if (res) {
                const time = 365;
                setCookie("access_token", res.access_token, time)
                setLoading(false);
                const user = await getUser(res.access_token)
                dispatch(loginSuccess(user));
                navigate("/admin");
            }
        } catch (error) {
            setLoading(false);
            if (error.response) {
                messageApi.error(
                    error.response.data.message
                )
            }
            else {
                messageApi.error(
                    "Lỗi hệ thống"
                )
            }
        }
    }
    const rules = [
        {
            required: true,
            message: "Vui lòng không để trống mục này"
        }
    ]
    const email = [
        {
            type: 'email',
            message: "Vui lòng nhập đúng email"
        }
    ]
    return (
        <>
            {contextHolder}
            <div className="login">
                <Row justify={"center"} gutter={[20, 20]}>
                    <Col span={8} >

                        <Card title="Đăng Nhập">
                            <Spin spinning={loading}>
                                <Form layout='vertical' onFinish={handleFinish}>
                                    <Form.Item label="Email" name="email" rules={[...rules, ...email]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Mật khẩu" name="password" rules={rules}>
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type='primary' htmlType='submit'>Đăng nhập</Button>
                                    </Form.Item>
                                </Form>
                            </Spin>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default Login