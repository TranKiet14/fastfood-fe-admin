import { Button, Layout } from 'antd'
import { useState } from 'react'
import './LayoutAdmin.scss'
import { MenuFoldOutlined,MenuUnfoldOutlined,HomeOutlined,LogoutOutlined  } from "@ant-design/icons"
import { Link, Outlet } from 'react-router-dom'
import MenuSider from '../../components/MenuSider'
const { Header, Sider, Content, Footer } = Layout
function LayoutAdmin() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <Layout className='layout-admin'>
                <Header className='header-admin'>
                    <div className={collapsed ? "header-admin__logo  header-admin__logo--collapsed" : "header-admin__logo"}>
                        {collapsed ? "AD" : "Admin"}
                    </div>
                    <div className='header-admin__nav'>
                        <div className='header-admin__nav-left'>
                            <div className='header-admin__collapse' onClick={() => {setCollapsed(!collapsed)}}>
                                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            </div>
                        </div>
                        <div className='header-admin__nav-right'>
                            <div className='header-admin__account'>
                                <Link to={"/"}><Button><HomeOutlined />Trang chủ</Button></Link>
                                <Link to={"/logout"}><Button><LogoutOutlined />Đăng xuất</Button></Link>
                            </div>
                        </div>
                    </div>
                </Header>
                <Layout>
                    <Sider width={240} className="sider" collapsed={collapsed} theme="light">
                        <MenuSider />
                    </Sider>
                    <Content className="content">
                        <Outlet />
                    </Content>
                </Layout>
                <Footer className='footer'>
                    Copyright 2023 by tran kiet
                </Footer>
            </Layout>
        </>
    )
}
export default LayoutAdmin