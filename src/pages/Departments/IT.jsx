import { useState } from 'react';
import {
    Card, Row, Col, Table, Tag, Button, Tabs, Statistic,
    Avatar, List, Space, Typography, Badge, Modal,
    Form, Input, Select, message, Progress
} from 'antd';
import {
    LaptopOutlined,
    CloudServerOutlined,
    SecurityScanOutlined,
    ToolOutlined,
    PlusOutlined,
    EyeOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import '../DepartmentPage.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

const IT = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    // Stats
    const stats = [
        { title: 'Active Systems', value: 147, icon: <CloudServerOutlined />, color: '#6366f1' },
        { title: 'Open Requests', value: 38, icon: <ToolOutlined />, color: '#f59e0b' },
        { title: 'System Uptime', value: '99.9%', icon: <SyncOutlined />, color: '#10b981' },
        { title: 'Security Score', value: 94, icon: <SecurityScanOutlined />, color: '#ec4899' },
    ];

    // IT Requests
    const itRequests = [
        { key: '1', id: 'IT-001', requester: 'John Smith', type: 'Hardware', description: 'New laptop request', priority: 'medium', status: 'pending' },
        { key: '2', id: 'IT-002', requester: 'Sarah Johnson', type: 'Software', description: 'Adobe Creative Suite license', priority: 'high', status: 'approved' },
        { key: '3', id: 'IT-003', requester: 'Mike Chen', type: 'Access', description: 'VPN access request', priority: 'high', status: 'in-progress' },
        { key: '4', id: 'IT-004', requester: 'Emily Davis', type: 'Support', description: 'Email configuration issue', priority: 'low', status: 'resolved' },
        { key: '5', id: 'IT-005', requester: 'Alex Kim', type: 'Hardware', description: 'Monitor replacement', priority: 'medium', status: 'pending' },
    ];

    // System status
    const systems = [
        { name: 'Production Server', status: 'online', uptime: 99.99, load: 45 },
        { name: 'Database Cluster', status: 'online', uptime: 99.95, load: 62 },
        { name: 'Email Server', status: 'maintenance', uptime: 99.8, load: 30 },
        { name: 'VPN Gateway', status: 'online', uptime: 99.9, load: 55 },
        { name: 'Backup Systems', status: 'online', uptime: 100, load: 20 },
    ];

    // Recent activities
    const activities = [
        { action: 'Security patch deployed to 45 systems', time: '10 min ago' },
        { action: 'Backup completed successfully', time: '1 hour ago' },
        { action: 'User access audit completed', time: '3 hours ago' },
        { action: 'SSL certificates renewed', time: '5 hours ago' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return 'success';
            case 'offline': return 'error';
            case 'maintenance': return 'warning';
            case 'approved': return 'success';
            case 'pending': return 'processing';
            case 'in-progress': return 'warning';
            case 'resolved': return 'default';
            default: return 'default';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'success';
            default: return 'default';
        }
    };

    const requestColumns = [
        { title: 'Ticket', dataIndex: 'id', key: 'id', render: (id) => <Text code>{id}</Text> },
        {
            title: 'Requester',
            dataIndex: 'requester',
            key: 'requester',
            render: (name) => (
                <Space>
                    <Avatar size="small" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
                        {name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Text style={{ color: '#fff' }}>{name}</Text>
                </Space>
            ),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type) => <Tag color="blue">{type}</Tag>
        },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            render: (priority) => (
                <Tag color={getPriorityColor(priority)} style={{ textTransform: 'capitalize' }}>
                    {priority}
                </Tag>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)} style={{ textTransform: 'capitalize' }}>
                    {status.replace('-', ' ')}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="text" icon={<EyeOutlined />} size="small" />
                    {record.status === 'pending' && (
                        <Button type="primary" size="small" icon={<CheckCircleOutlined />}>Process</Button>
                    )}
                </Space>
            ),
        },
    ];

    const handleSubmit = () => {
        form.validateFields().then(values => {
            message.success('IT request submitted successfully!');
            setIsModalOpen(false);
            form.resetFields();
        });
    };

    const tabItems = [
        {
            key: 'requests',
            label: (
                <Badge count={2} offset={[10, 0]}>
                    IT Requests
                </Badge>
            ),
            children: (
                <Table
                    columns={requestColumns}
                    dataSource={itRequests}
                    pagination={{ pageSize: 5 }}
                    className="department-table"
                />
            ),
        },
        {
            key: 'systems',
            label: 'System Status',
            children: (
                <div className="systems-grid">
                    {systems.map((system, index) => (
                        <Card key={index} className="system-card" size="small">
                            <div className="system-header">
                                <Space>
                                    <CloudServerOutlined style={{ fontSize: 18, color: '#6366f1' }} />
                                    <Text strong style={{ color: '#fff' }}>{system.name}</Text>
                                </Space>
                                <Tag color={getStatusColor(system.status)} style={{ textTransform: 'capitalize' }}>
                                    {system.status}
                                </Tag>
                            </div>
                            <div className="system-stats">
                                <div className="system-stat">
                                    <Text type="secondary">Uptime</Text>
                                    <Text style={{ color: '#10b981' }}>{system.uptime}%</Text>
                                </div>
                                <div className="system-stat">
                                    <Text type="secondary">Load</Text>
                                    <Progress
                                        percent={system.load}
                                        size="small"
                                        strokeColor={system.load > 70 ? '#ef4444' : '#6366f1'}
                                    />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ),
        },
        {
            key: 'security',
            label: 'Security',
            children: (
                <div className="empty-state">
                    <SecurityScanOutlined style={{ fontSize: 48, color: '#6366f1' }} />
                    <Title level={4}>Security Dashboard</Title>
                    <Text type="secondary">Monitor threats and security policies</Text>
                </div>
            ),
        },
    ];

    return (
        <div className="department-page">
            <div className="page-header">
                <div>
                    <Title level={2} className="page-title">
                        <LaptopOutlined className="title-icon" />
                        <span className="gradient-text-it">IT Department</span>
                    </Title>
                    <Text type="secondary">Manage IT infrastructure, support, and security</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                    New Request
                </Button>
            </div>

            {/* Stats */}
            <Row gutter={[24, 24]} className="stats-row">
                {stats.map((stat, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <Card className="stat-card">
                            <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                                {stat.icon}
                            </div>
                            <Statistic
                                title={stat.title}
                                value={stat.value}
                                valueStyle={{ color: '#fff', fontWeight: 700 }}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Main Content */}
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={18}>
                    <Card className="main-card">
                        <Tabs items={tabItems} className="department-tabs" />
                    </Card>
                </Col>

                <Col xs={24} lg={6}>
                    <Card className="side-card" title="Recent Activity">
                        <List
                            dataSource={activities}
                            renderItem={(item) => (
                                <List.Item className="activity-item">
                                    <div>
                                        <Text style={{ color: '#fff', fontSize: 13 }}>{item.action}</Text>
                                        <Text type="secondary" style={{ display: 'block', fontSize: 11, marginTop: 4 }}>
                                            <ClockCircleOutlined /> {item.time}
                                        </Text>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Modal */}
            <Modal
                title="Submit IT Request"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSubmit}
                className="department-modal"
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="type" label="Request Type" rules={[{ required: true }]}>
                        <Select placeholder="Select type">
                            <Select.Option value="hardware">Hardware</Select.Option>
                            <Select.Option value="software">Software</Select.Option>
                            <Select.Option value="access">Access/Permissions</Select.Option>
                            <Select.Option value="support">Technical Support</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
                        <Select placeholder="Select priority">
                            <Select.Option value="high">High</Select.Option>
                            <Select.Option value="medium">Medium</Select.Option>
                            <Select.Option value="low">Low</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <TextArea rows={4} placeholder="Describe your request in detail" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default IT;
