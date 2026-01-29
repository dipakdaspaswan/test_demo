import { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import HeaderBar from './HeaderBar';
import './AppLayout.css';

const { Content } = Layout;

const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleToggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout className="app-layout">
            <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />

            <Layout
                className="main-layout"
                style={{ marginLeft: collapsed ? 80 : 260 }}
            >
                <HeaderBar collapsed={collapsed} onToggle={handleToggle} />

                <Content className="main-content">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
