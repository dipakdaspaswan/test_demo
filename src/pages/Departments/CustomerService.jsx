import { useState } from 'react';
import {
    Card, Row, Col, Table, Tag, Button, Tabs, Statistic,
    Avatar, List, Space, Typography, Badge, Modal,
    Form, Input, Select, message, Rate
} from 'antd';
import {
    CustomerServiceOutlined,
    CommentOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined,
    PlusOutlined,
    EyeOutlined,
    MessageOutlined,
    StarOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import '../DepartmentPage.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

const CustomerService = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    // Stats
    const stats = [
        { title: 'Open Tickets', value: 156, icon: <CommentOutlined />, color: '#f59e0b' },
        { title: 'Resolved Today', value: 42, icon: <CheckCircleOutlined />, color: '#10b981' },
        { title: 'Avg Response Time', value: '18m', icon: <ClockCircleOutlined />, color: '#6366f1' },
        { title: 'Customer Satisfaction', value: 4.8, icon: <StarOutlined />, color: '#ec4899' },
    ];

    // Support tickets
    const tickets = [
        { key: '1', id: 'TKT-001', customer: 'Alice Brown', subject: 'Payment Issue', priority: 'high', status: 'open', created: '2026-01-29T10:30:00' },
        { key: '2', id: 'TKT-002', customer: 'Bob Wilson', subject: 'Account Access', priority: 'medium', status: 'in-progress', created: '2026-01-29T09:15:00' },
        { key: '3', id: 'TKT-003', customer: 'Carol White', subject: 'Feature Request', priority: 'low', status: 'open', created: '2026-01-28T16:45:00' },
        { key: '4', id: 'TKT-004', customer: 'David Lee', subject: 'Technical Issue', priority: 'high', status: 'resolved', created: '2026-01-28T14:20:00' },
        { key: '5', id: 'TKT-005', customer: 'Eve Taylor', subject: 'Billing Inquiry', priority: 'medium', status: 'in-progress', created: '2026-01-28T11:00:00' },
    ];

    // Customer feedback
    const feedback = [
        { key: '1', customer: 'John D.', rating: 5, comment: 'Excellent support! Issue resolved quickly.', date: '2026-01-29' },
        { key: '2', customer: 'Sarah M.', rating: 4, comment: 'Good service, but response time could be better.', date: '2026-01-28' },
        { key: '3', customer: 'Mike R.', rating: 5, comment: 'Very helpful and professional team.', date: '2026-01-27' },
        { key: '4', customer: 'Lisa K.', rating: 3, comment: 'Issue was resolved but took multiple attempts.', date: '2026-01-26' },
    ];

    // Recent activities
    const activities = [
        { agent: 'Support Agent', action: 'resolved ticket TKT-004', time: '5 min ago' },
        { agent: 'Team Lead', action: 'escalated TKT-001 to priority', time: '30 min ago' },
        { agent: 'Support Agent', action: 'updated TKT-002 status', time: '1 hour ago' },
        { agent: 'System', action: 'assigned TKT-003 to queue', time: '2 hours ago' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'open': return 'processing';
            case 'in-progress': return 'warning';
            case 'resolved': return 'success';
            case 'closed': return 'default';
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

    const ticketColumns = [
        { title: 'Ticket ID', dataIndex: 'id', key: 'id', render: (id) => <Text code>{id}</Text> },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
            render: (name) => (
                <Space>
                    <Avatar size="small" style={{ background: 'linear-gradient(135deg, #ec4899, #6366f1)' }}>
                        {name[0]}
                    </Avatar>
                    <Text style={{ color: '#fff' }}>{name}</Text>
                </Space>
            ),
        },
        { title: 'Subject', dataIndex: 'subject', key: 'subject' },
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
            title: 'Created',
            dataIndex: 'created',
            key: 'created',
            render: (d) => dayjs(d).format('MMM D, HH:mm'),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="text" icon={<EyeOutlined />} size="small" />
                    <Button type="text" icon={<MessageOutlined />} size="small" />
                </Space>
            ),
        },
    ];

    const feedbackColumns = [
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
            render: (name) => (
                <Space>
                    <Avatar size="small" style={{ background: 'linear-gradient(135deg, #10b981, #6366f1)' }}>
                        {name[0]}
                    </Avatar>
                    <Text style={{ color: '#fff' }}>{name}</Text>
                </Space>
            ),
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating) => <Rate disabled defaultValue={rating} style={{ fontSize: 14 }} />,
        },
        { title: 'Comment', dataIndex: 'comment', key: 'comment' },
        { title: 'Date', dataIndex: 'date', key: 'date', render: (d) => dayjs(d).format('MMM D, YYYY') },
    ];

    const handleSubmit = () => {
        form.validateFields().then(values => {
            message.success('Ticket created successfully!');
            setIsModalOpen(false);
            form.resetFields();
        });
    };

    const tabItems = [
        {
            key: 'tickets',
            label: (
                <Badge count={3} offset={[10, 0]}>
                    Support Tickets
                </Badge>
            ),
            children: (
                <Table
                    columns={ticketColumns}
                    dataSource={tickets}
                    pagination={{ pageSize: 5 }}
                    className="department-table"
                />
            ),
        },
        {
            key: 'feedback',
            label: 'Customer Feedback',
            children: (
                <Table
                    columns={feedbackColumns}
                    dataSource={feedback}
                    pagination={{ pageSize: 5 }}
                    className="department-table"
                />
            ),
        },
        {
            key: 'knowledge',
            label: 'Knowledge Base',
            children: (
                <div className="empty-state">
                    <CustomerServiceOutlined style={{ fontSize: 48, color: '#ec4899' }} />
                    <Title level={4}>Knowledge Base</Title>
                    <Text type="secondary">FAQ and support articles</Text>
                </div>
            ),
        },
    ];

    return (
        <div className="department-page">
            <div className="page-header">
                <div>
                    <Title level={2} className="page-title">
                        <CustomerServiceOutlined className="title-icon" />
                        <span className="gradient-text-cs">Customer Service</span>
                    </Title>
                    <Text type="secondary">Manage support tickets, feedback, and customer satisfaction</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                    New Ticket
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
                                        <Text strong style={{ color: '#fff' }}>{item.agent}</Text>
                                        <Text type="secondary" style={{ display: 'block' }}>{item.action}</Text>
                                        <Text type="secondary" style={{ fontSize: 11 }}>
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
                title="Create Support Ticket"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSubmit}
                className="department-modal"
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="customer" label="Customer Name" rules={[{ required: true }]}>
                        <Input placeholder="Enter customer name" />
                    </Form.Item>
                    <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
                        <Input placeholder="Brief description of the issue" />
                    </Form.Item>
                    <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
                        <Select placeholder="Select priority">
                            <Select.Option value="high">High</Select.Option>
                            <Select.Option value="medium">Medium</Select.Option>
                            <Select.Option value="low">Low</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <TextArea rows={4} placeholder="Detailed description of the issue" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CustomerService;
