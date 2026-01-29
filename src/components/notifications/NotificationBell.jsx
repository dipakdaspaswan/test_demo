import { useState, useEffect } from 'react';
import { Badge, Dropdown, List, Typography, Button, Tabs, Empty, Spin, Tag } from 'antd';
import { BellOutlined, CheckOutlined, ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import useNotifications from '../../hooks/useNotifications';
import './NotificationBell.css';

dayjs.extend(relativeTime);

const { Text, Title } = Typography;

const NotificationBell = () => {
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    const {
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        refresh,
        hrNotifications,
        financeNotifications,
        formNotifications,
    } = useNotifications();

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'red';
            case 'medium': return 'orange';
            case 'low': return 'green';
            default: return 'blue';
        }
    };

    const getTypeIcon = (type) => {
        const icons = {
            hr: '👥',
            finance: '💰',
            forms: '📋',
            approval: '✅',
            system: '⚙️',
        };
        return icons[type] || '📌';
    };

    const getFilteredNotifications = () => {
        switch (activeTab) {
            case 'hr': return hrNotifications;
            case 'finance': return financeNotifications;
            case 'forms': return formNotifications;
            default: return notifications;
        }
    };

    const tabItems = [
        { key: 'all', label: `All (${notifications.length})` },
        { key: 'hr', label: `HR (${hrNotifications.length})` },
        { key: 'finance', label: `Finance (${financeNotifications.length})` },
        { key: 'forms', label: `Forms (${formNotifications.length})` },
    ];

    const dropdownContent = (
        <div className="notification-dropdown">
            <div className="notification-header">
                <Title level={5} style={{ margin: 0 }}>Notifications</Title>
                <div className="notification-actions">
                    <Button
                        type="link"
                        size="small"
                        onClick={refresh}
                        loading={loading}
                    >
                        Refresh
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={markAllAsRead}
                        disabled={unreadCount === 0}
                    >
                        Mark all read
                    </Button>
                </div>
            </div>

            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabItems}
                size="small"
                className="notification-tabs"
            />

            <div className="notification-content">
                {loading && notifications.length === 0 ? (
                    <div className="notification-loading">
                        <Spin size="large" />
                    </div>
                ) : getFilteredNotifications().length === 0 ? (
                    <Empty
                        description="No notifications"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                ) : (
                    <List
                        className="notification-list"
                        dataSource={getFilteredNotifications().slice(0, 10)}
                        renderItem={(item) => (
                            <List.Item
                                className={`notification-item ${!item.read ? 'unread' : ''}`}
                                onClick={() => !item.read && markAsRead(item.id)}
                            >
                                <div className="notification-item-content">
                                    <div className="notification-item-header">
                                        <span className="notification-type-icon">{getTypeIcon(item.type)}</span>
                                        <Text strong className="notification-title">{item.title}</Text>
                                        {!item.read && <span className="unread-indicator" />}
                                    </div>
                                    <Text type="secondary" className="notification-message" ellipsis>
                                        {item.message}
                                    </Text>
                                    <div className="notification-meta">
                                        <Tag color={getPriorityColor(item.priority)} size="small">
                                            {item.priority}
                                        </Tag>
                                        <Text type="secondary" className="notification-time">
                                            <ClockCircleOutlined /> {dayjs(item.createdAt).fromNow()}
                                        </Text>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                )}
            </div>

            <div className="notification-footer">
                <Button type="link" block>
                    View all notifications
                </Button>
            </div>
        </div>
    );

    return (
        <Dropdown
            dropdownRender={() => dropdownContent}
            trigger={['click']}
            open={open}
            onOpenChange={setOpen}
            placement="bottomRight"
        >
            <div className="notification-bell">
                <Badge count={unreadCount} overflowCount={99} size="small">
                    <BellOutlined className="bell-icon" />
                </Badge>
            </div>
        </Dropdown>
    );
};

export default NotificationBell;
