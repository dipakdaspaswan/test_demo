import { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Drawer, Grid } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    DashboardOutlined,
    TeamOutlined,
    BankOutlined,
    CustomerServiceOutlined,
    LaptopOutlined,
    FormOutlined,
    UsergroupAddOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import './Sidebar.css';
import { useTheme } from '../../context/ThemeContext';

const { Sider } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

// Inner content component to be reused in both Sider (Desktop) and Drawer (Mobile)
const SidebarContent = ({ collapsed, navigate, location, openKeys, setOpenKeys }) => {
    const menuItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
        },
        {
            key: 'departments',
            icon: <AppstoreOutlined />,
            label: 'Departments',
            children: [
                {
                    key: 'hr',
                    icon: <TeamOutlined />,
                    label: 'HR',
                },
                {
                    key: 'finance',
                    icon: <BankOutlined />,
                    label: 'Finance',
                },
                {
                    key: 'customer-service',
                    icon: <CustomerServiceOutlined />,
                    label: 'Customer Service',
                },
                {
                    key: 'it',
                    icon: <LaptopOutlined />,
                    label: 'IT',
                },
            ],
        },
        {
            key: 'workflow',
            icon: <FormOutlined />,
            label: 'Workflow',
            children: [
                {
                    key: 'forms',
                    icon: <FormOutlined />,
                    label: 'Forms',
                },
            ],
        },
        {
            key: 'collaboration',
            icon: <UsergroupAddOutlined />,
            label: 'Collaboration',
            children: [
                {
                    key: 'teams',
                    icon: <TeamOutlined />,
                    label: 'Microsoft Teams',
                },
            ],
        },
        {
            type: 'divider',
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings',
        },
    ];

    const handleMenuClick = ({ key }) => {
        const routes = {
            dashboard: '/',
            hr: '/departments/hr',
            finance: '/departments/finance',
            'customer-service': '/departments/customer-service',
            it: '/departments/it',
            forms: '/workflow/forms',
            teams: '/collaboration/teams',
            settings: '/settings',
        };

        const route = routes[key];
        if (route) {
            navigate(route);
        }
    };

    const handleOpenChange = (keys) => {
        setOpenKeys(keys);
    };

    const getSelectedKey = () => {
        const path = location.pathname;
        if (path === '/') return 'dashboard';
        if (path.includes('/departments/hr')) return 'hr';
        if (path.includes('/departments/finance')) return 'finance';
        if (path.includes('/departments/customer-service')) return 'customer-service';
        if (path.includes('/departments/it')) return 'it';
        if (path.includes('/workflow/forms')) return 'forms';
        if (path.includes('/collaboration/teams')) return 'teams';
        if (path.includes('/settings')) return 'settings';
        return 'dashboard';
    };

    return (
        <>
            <div className="sidebar-header">
                <div className="logo-container">
                    <div className="logo-icon">
                        <span>EP</span>
                    </div>
                    {!collapsed && (
                        <Title level={4} className="logo-text">
                            Enterprise Portal
                        </Title>
                    )}
                </div>
            </div>

            <div className="sidebar-menu-container">
                <Menu
                    mode="inline"
                    theme="dark" // Using dark theme prop, but overrides in CSS handle actual colors
                    selectedKeys={[getSelectedKey()]}
                    openKeys={collapsed ? [] : openKeys}
                    onOpenChange={handleOpenChange}
                    onClick={handleMenuClick}
                    items={menuItems}
                    className="sidebar-menu"
                />
            </div>

            <div className="sidebar-footer">
                {!collapsed && (
                    <div className="user-info">
                        <div className="user-avatar">
                            <span>JD</span>
                        </div>
                        <div className="user-details">
                            <span className="user-name">John Doe</span>
                            <span className="user-role">Administrator</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

const Sidebar = ({ collapsed, onCollapse, mobileOpen, onMobileClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState(['departments']);
    const screens = useBreakpoint();
    const { isDark } = useTheme();

    // Check if we are on a mobile screen
    const isMobile = !screens.lg;

    if (isMobile) {
        return (
            <Drawer
                placement="left"
                onClose={onMobileClose}
                open={mobileOpen}
                width={260}
                className={`mobile-sidebar-drawer ${isDark ? 'theme-dark' : 'theme-light'}`}
                styles={{ body: { padding: 0 } }}
                closeIcon={null}
            >
                <div className="app-sidebar" style={{ position: 'relative', height: '100%', width: '100%' }}>
                    <SidebarContent
                        collapsed={false}
                        navigate={(path) => {
                            navigate(path);
                            onMobileClose();
                        }}
                        location={location}
                        openKeys={openKeys}
                        setOpenKeys={setOpenKeys}
                    />
                </div>
            </Drawer>
        );
    }

    return (
        <Sider
            className="app-sidebar"
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            breakpoint="lg"
            collapsedWidth={80}
            width={260}
            trigger={null}
        >
            <SidebarContent
                collapsed={collapsed}
                navigate={navigate}
                location={location}
                openKeys={openKeys}
                setOpenKeys={setOpenKeys}
            />
        </Sider>
    );
};

export default Sidebar;
