import { useState, useEffect } from 'react';
import { Layout, Grid } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import HeaderBar from './HeaderBar';
import './AppLayout.css';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const screens = useBreakpoint();

    // Determine if we are on a mobile screen
    // Note: useBreakpoint might return empty object initially, so safely check
    const isMobile = screens.lg === false;

    // Handle toggle based on screen size
    const handleToggle = () => {
        if (isMobile) {
            setMobileOpen(!mobileOpen);
        } else {
            setCollapsed(!collapsed);
        }
    };

    return (
        <Layout className="app-layout">
            <Sidebar
                collapsed={collapsed}
                onCollapse={setCollapsed}
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
            />

            <Layout
                className="main-layout"
                style={{
                    // No margin on mobile, appropriate margin on desktop
                    marginLeft: isMobile ? 0 : (collapsed ? 80 : 260)
                }}
            >
                <HeaderBar collapsed={isMobile ? false : collapsed} onToggle={handleToggle} />

                <Content className="main-content">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
