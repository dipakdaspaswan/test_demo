import { useState } from 'react';
import { Table, Card, Tag, Button, Input, Select, Tabs, Space, Typography, Empty, Badge } from 'antd';
import {
    SearchOutlined,
    FilterOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import useNotifications from '../../hooks/useNotifications';
import './NotificationList.css';

const { Title, Text } = Typography;
const { Search } = Input;

const NotificationList = () => {
    const [searchText, setSearchText] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');

    const {
        notifications,
        loading,
        markAsRead,
        markAllAsRead,
        refresh
    } = useNotifications();

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'success';
            default: return 'default';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'hr': return '#6366f1';
            case 'finance': return '#10b981';
            case 'forms': return '#f59e0b';
            case 'approval': return '#ec4899';
            case 'system': return '#6b7280';
            default: return '#3b82f6';
        }
    };

    const filteredNotifications = notifications.filter(notification => {
        const matchesSearch = notification.title.toLowerCase().includes(searchText.toLowerCase()) ||
            notification.message.toLowerCase().includes(searchText.toLowerCase());
        const matchesType = filterType === 'all' || notification.type === filterType;
        const matchesPriority = filterPriority === 'all' || notification.priority === filterPriority;

        return matchesSearch && matchesType && matchesPriority;
    });

    const columns = [
        {
            title: 'Status',
            dataIndex: 'read',
            key: 'read',
            width: 80,
            render: (read) => (
                <Badge
                    status={read ? 'default' : 'processing'}
                    text={read ? 'Read' : 'Unread'}
                />
            ),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 120,
            render: (type) => (
                <Tag
                    style={{
                        background: getTypeColor(type),
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        textTransform: 'capitalize',
                    }}
                >
                    {type}
                </Tag>
            ),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (title, record) => (
                <div>
                    <Text strong style={{ color: record.read ? 'rgba(255,255,255,0.6)' : '#fff' }}>
                        {title}
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        {record.message}
                    </Text>
                </div>
            ),
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            width: 100,
            render: (priority) => (
                <Tag color={getPriorityColor(priority)} style={{ textTransform: 'capitalize' }}>
                    {priority}
                </Tag>
            ),
        },
        {
            title: 'Time',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            render: (date) => (
                <Text type="secondary">
                    <ClockCircleOutlined /> {dayjs(date).format('MMM D, HH:mm')}
                </Text>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: 120,
            render: (_, record) => (
                <Button
                    type="link"
                    size="small"
                    disabled={record.read}
                    onClick={() => markAsRead(record.id)}
                    icon={<CheckCircleOutlined />}
                >
                    Mark Read
                </Button>
            ),
        },
    ];

    const tabItems = [
        {
            key: 'all',
            label: (
                <span>
                    All <Badge count={notifications.length} style={{ marginLeft: 8 }} />
                </span>
            ),
        },
        {
            key: 'unread',
            label: (
                <span>
                    Unread <Badge count={notifications.filter(n => !n.read).length} style={{ marginLeft: 8 }} />
                </span>
            ),
        },
        { key: 'hr', label: 'HR' },
        { key: 'finance', label: 'Finance' },
        { key: 'forms', label: 'Forms' },
    ];

    const handleTabChange = (key) => {
        if (key === 'unread') {
            setFilterType('all');
        } else {
            setFilterType(key);
        }
    };

    return (
        <div className="notification-list-page">
            <div className="notification-list-header">
                <Title level={2}>
                    <span className="gradient-text">Notifications</span>
                </Title>
                <Text type="secondary">
                    Stay updated with all your notifications • Auto-refreshes every 5 minutes
                </Text>
            </div>

            <Card className="notification-list-card">
                <div className="notification-list-toolbar">
                    <Space size="middle" wrap>
                        <Search
                            placeholder="Search notifications..."
                            allowClear
                            style={{ width: 300 }}
                            prefix={<SearchOutlined />}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Select
                            placeholder="Filter by type"
                            style={{ width: 150 }}
                            value={filterType}
                            onChange={setFilterType}
                            options={[
                                { value: 'all', label: 'All Types' },
                                { value: 'hr', label: 'HR' },
                                { value: 'finance', label: 'Finance' },
                                { value: 'forms', label: 'Forms' },
                                { value: 'approval', label: 'Approval' },
                                { value: 'system', label: 'System' },
                            ]}
                        />
                        <Select
                            placeholder="Filter by priority"
                            style={{ width: 150 }}
                            value={filterPriority}
                            onChange={setFilterPriority}
                            options={[
                                { value: 'all', label: 'All Priorities' },
                                { value: 'high', label: 'High' },
                                { value: 'medium', label: 'Medium' },
                                { value: 'low', label: 'Low' },
                            ]}
                        />
                    </Space>
                    <Space>
                        <Button onClick={refresh} loading={loading}>
                            Refresh
                        </Button>
                        <Button
                            type="primary"
                            onClick={markAllAsRead}
                            icon={<CheckCircleOutlined />}
                        >
                            Mark All Read
                        </Button>
                    </Space>
                </div>

                <Tabs
                    items={tabItems}
                    onChange={handleTabChange}
                    className="notification-tabs"
                />

                <Table
                    columns={columns}
                    dataSource={filteredNotifications}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} notifications`,
                    }}
                    locale={{
                        emptyText: (
                            <Empty
                                description="No notifications found"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        ),
                    }}
                    className="notification-table"
                />
            </Card>
        </div>
    );
};

export default NotificationList;
