import { Layout, Input, Space, Button, Dropdown, Avatar, Typography } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
    SettingOutlined,
    UserOutlined,
    LogoutOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import NotificationBell from '../notifications/NotificationBell';
import './HeaderBar.css';

const { Header } = Layout;
const { Text } = Typography;

const HeaderBar = ({ collapsed, onToggle }) => {
    const userMenuItems = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'My Profile',
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings',
        },
        {
            key: 'help',
            icon: <QuestionCircleOutlined />,
            label: 'Help & Support',
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            danger: true,
        },
    ];

    const handleUserMenuClick = ({ key }) => {
        if (key === 'logout') {
            // Handle logout
            console.log('Logout clicked');
        }
    };

    return (
        <Header className="app-header">
            <div className="header-left">
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={onToggle}
                    className="toggle-btn"
                />

                <div className="header-search">
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Search anything..."
                        className="search-input"
                    />
                </div>
            </div>

            <div className="header-right">
                <Space size="middle">
                    <NotificationBell />

                    <Dropdown
                        menu={{
                            items: userMenuItems,
                            onClick: handleUserMenuClick
                        }}
                        placement="bottomRight"
                        trigger={['click']}
                    >
                        <div className="user-dropdown">
                            <Avatar
                                className="user-avatar"
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                }}
                            >
                                JD
                            </Avatar>
                            <div className="user-info">
                                <Text className="user-name">John Doe</Text>
                                <Text className="user-role">Admin</Text>
                            </div>
                        </div>
                    </Dropdown>
                </Space>
            </div>
        </Header>
    );
};

export default HeaderBar;
