import { useState } from 'react';
import {
    Card, Row, Col, Table, Tag, Button, Tabs, Statistic,
    Progress, Avatar, List, Space, Typography, Badge, Modal,
    Form, Input, Select, DatePicker, message
} from 'antd';
import {
    TeamOutlined,
    UserAddOutlined,
    FileTextOutlined,
    CalendarOutlined,
    PlusOutlined,
    EditOutlined,
    EyeOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import '../DepartmentPage.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

const HR = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    // Stats
    const stats = [
        { title: 'Total Employees', value: 1248, icon: <TeamOutlined />, color: '#6366f1' },
        { title: 'Open Positions', value: 24, icon: <UserAddOutlined />, color: '#10b981' },
        { title: 'Pending Requests', value: 47, icon: <FileTextOutlined />, color: '#f59e0b' },
        { title: 'Scheduled Reviews', value: 18, icon: <CalendarOutlined />, color: '#ec4899' },
    ];

    // Employee data
    const employees = [
        { key: '1', name: 'John Smith', department: 'Engineering', position: 'Senior Developer', status: 'active', joined: '2023-06-15' },
        { key: '2', name: 'Sarah Johnson', department: 'Marketing', position: 'Marketing Manager', status: 'active', joined: '2022-03-20' },
        { key: '3', name: 'Mike Chen', department: 'Finance', position: 'Financial Analyst', status: 'on-leave', joined: '2024-01-10' },
        { key: '4', name: 'Emily Davis', department: 'HR', position: 'HR Specialist', status: 'active', joined: '2023-09-05' },
        { key: '5', name: 'Alex Kim', department: 'Customer Service', position: 'Support Lead', status: 'active', joined: '2021-11-25' },
    ];

    // Leave requests
    const leaveRequests = [
        { key: '1', employee: 'John Smith', type: 'Annual Leave', from: '2026-02-01', to: '2026-02-05', status: 'pending' },
        { key: '2', employee: 'Sarah Johnson', type: 'Sick Leave', from: '2026-01-30', to: '2026-01-31', status: 'approved' },
        { key: '3', employee: 'Mike Chen', type: 'Personal Leave', from: '2026-02-10', to: '2026-02-12', status: 'pending' },
        { key: '4', employee: 'Emily Davis', type: 'Remote Work', from: '2026-02-15', to: '2026-02-20', status: 'rejected' },
    ];

    // Recent activities
    const activities = [
        { user: 'John Smith', action: 'submitted leave request', time: '5 min ago' },
        { user: 'HR Admin', action: 'approved Sarah\'s leave', time: '1 hour ago' },
        { user: 'Emily Davis', action: 'updated employee profile', time: '2 hours ago' },
        { user: 'System', action: 'sent performance review reminder', time: '3 hours ago' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'success';
            case 'on-leave': return 'warning';
            case 'inactive': return 'default';
            case 'approved': return 'success';
            case 'pending': return 'processing';
            case 'rejected': return 'error';
            default: return 'default';
        }
    };

    const employeeColumns = [
        {
            title: 'Employee',
            dataIndex: 'name',
            key: 'name',
            render: (name) => (
                <Space>
                    <Avatar style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
                        {name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Text strong style={{ color: '#fff' }}>{name}</Text>
                </Space>
            ),
        },
        { title: 'Department', dataIndex: 'department', key: 'department' },
        { title: 'Position', dataIndex: 'position', key: 'position' },
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
            title: 'Joined',
            dataIndex: 'joined',
            key: 'joined',
            render: (date) => dayjs(date).format('MMM D, YYYY'),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <Space>
                    <Button type="text" icon={<EyeOutlined />} size="small" />
                    <Button type="text" icon={<EditOutlined />} size="small" />
                </Space>
            ),
        },
    ];

    const leaveColumns = [
        { title: 'Employee', dataIndex: 'employee', key: 'employee' },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'From', dataIndex: 'from', key: 'from', render: (d) => dayjs(d).format('MMM D') },
        { title: 'To', dataIndex: 'to', key: 'to', render: (d) => dayjs(d).format('MMM D') },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)} style={{ textTransform: 'capitalize' }}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                record.status === 'pending' && (
                    <Space>
                        <Button type="primary" size="small" icon={<CheckCircleOutlined />}>Approve</Button>
                        <Button danger size="small" icon={<ExclamationCircleOutlined />}>Reject</Button>
                    </Space>
                )
            ),
        },
    ];

    const handleSubmit = () => {
        form.validateFields().then(values => {
            message.success('Leave request submitted successfully!');
            setIsModalOpen(false);
            form.resetFields();
        });
    };

    const tabItems = [
        {
            key: 'employees',
            label: 'Employees',
            children: (
                <Table
                    columns={employeeColumns}
                    dataSource={employees}
                    pagination={{ pageSize: 5 }}
                    className="department-table"
                />
            ),
        },
        {
            key: 'leaves',
            label: (
                <Badge count={2} offset={[10, 0]}>
                    Leave Requests
                </Badge>
            ),
            children: (
                <Table
                    columns={leaveColumns}
                    dataSource={leaveRequests}
                    pagination={{ pageSize: 5 }}
                    className="department-table"
                />
            ),
        },
        {
            key: 'onboarding',
            label: 'Onboarding',
            children: (
                <div className="empty-state">
                    <TeamOutlined style={{ fontSize: 48, color: '#6366f1' }} />
                    <Title level={4}>Onboarding Queue</Title>
                    <Text type="secondary">No pending onboarding tasks</Text>
                </div>
            ),
        },
    ];

    return (
        <div className="department-page">
            <div className="page-header">
                <div>
                    <Title level={2} className="page-title">
                        <TeamOutlined className="title-icon" />
                        <span className="gradient-text">HR Department</span>
                    </Title>
                    <Text type="secondary">Manage employees, leaves, and HR operations</Text>
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
                                        <Text strong style={{ color: '#fff' }}>{item.user}</Text>
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
                title="New Leave Request"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSubmit}
                className="department-modal"
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="type" label="Leave Type" rules={[{ required: true }]}>
                        <Select placeholder="Select leave type">
                            <Select.Option value="annual">Annual Leave</Select.Option>
                            <Select.Option value="sick">Sick Leave</Select.Option>
                            <Select.Option value="personal">Personal Leave</Select.Option>
                            <Select.Option value="remote">Remote Work</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="dates" label="Date Range" rules={[{ required: true }]}>
                        <DatePicker.RangePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="reason" label="Reason">
                        <TextArea rows={3} placeholder="Enter reason (optional)" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default HR;
