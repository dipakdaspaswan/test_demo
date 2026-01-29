import { useState } from 'react';
import {
    Card, Row, Col, Table, Tag, Button, Tabs, Statistic,
    Avatar, List, Space, Typography, Badge, Modal,
    Form, Input, Select, InputNumber, message
} from 'antd';
import {
    DollarOutlined,
    FileTextOutlined,
    RiseOutlined,
    BankOutlined,
    PlusOutlined,
    EditOutlined,
    EyeOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined,
    DownloadOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import '../DepartmentPage.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

const Finance = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    // Stats
    const stats = [
        { title: 'Monthly Budget', value: 250000, prefix: '$', icon: <DollarOutlined />, color: '#10b981' },
        { title: 'Pending Expenses', value: 34500, prefix: '$', icon: <FileTextOutlined />, color: '#f59e0b' },
        { title: 'Revenue Growth', value: 18.5, suffix: '%', icon: <RiseOutlined />, color: '#6366f1' },
        { title: 'Active Invoices', value: 156, icon: <BankOutlined />, color: '#ec4899' },
    ];

    // Expense reports
    const expenses = [
        { key: '1', id: 'EXP-001', employee: 'John Smith', category: 'Travel', amount: 1250, date: '2026-01-28', status: 'pending' },
        { key: '2', id: 'EXP-002', employee: 'Sarah Johnson', category: 'Marketing', amount: 3500, date: '2026-01-27', status: 'approved' },
        { key: '3', id: 'EXP-003', employee: 'Mike Chen', category: 'Equipment', amount: 890, date: '2026-01-26', status: 'pending' },
        { key: '4', id: 'EXP-004', employee: 'Emily Davis', category: 'Training', amount: 2100, date: '2026-01-25', status: 'rejected' },
        { key: '5', id: 'EXP-005', employee: 'Alex Kim', category: 'Office Supplies', amount: 450, date: '2026-01-24', status: 'approved' },
    ];

    // Purchase orders
    const purchaseOrders = [
        { key: '1', id: 'PO-101', vendor: 'Tech Solutions Inc.', amount: 15000, date: '2026-01-28', status: 'pending' },
        { key: '2', id: 'PO-102', vendor: 'Office Supplies Co.', amount: 2300, date: '2026-01-27', status: 'approved' },
        { key: '3', id: 'PO-103', vendor: 'Cloud Services Ltd.', amount: 8900, date: '2026-01-26', status: 'in-review' },
        { key: '4', id: 'PO-104', vendor: 'Marketing Agency', amount: 12000, date: '2026-01-25', status: 'approved' },
    ];

    // Recent transactions
    const transactions = [
        { description: 'Expense #EXP-002 approved', amount: 3500, type: 'expense', time: '1 hour ago' },
        { description: 'Invoice #INV-456 paid', amount: 12500, type: 'income', time: '3 hours ago' },
        { description: 'PO #PO-102 processed', amount: 2300, type: 'expense', time: '5 hours ago' },
        { description: 'Salary batch processed', amount: 185000, type: 'expense', time: 'Yesterday' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'success';
            case 'pending': return 'processing';
            case 'rejected': return 'error';
            case 'in-review': return 'warning';
            default: return 'default';
        }
    };

    const expenseColumns = [
        { title: 'ID', dataIndex: 'id', key: 'id', render: (id) => <Text code>{id}</Text> },
        {
            title: 'Employee',
            dataIndex: 'employee',
            key: 'employee',
            render: (name) => (
                <Space>
                    <Avatar size="small" style={{ background: 'linear-gradient(135deg, #10b981, #6366f1)' }}>
                        {name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Text style={{ color: '#fff' }}>{name}</Text>
                </Space>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (cat) => <Tag color="blue">{cat}</Tag>
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => <Text strong style={{ color: '#10b981' }}>${amount.toLocaleString()}</Text>
        },
        { title: 'Date', dataIndex: 'date', key: 'date', render: (d) => dayjs(d).format('MMM D, YYYY') },
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
                <Space>
                    <Button type="text" icon={<EyeOutlined />} size="small" />
                    {record.status === 'pending' && (
                        <>
                            <Button type="primary" size="small" icon={<CheckCircleOutlined />}>Approve</Button>
                            <Button danger size="small" icon={<ExclamationCircleOutlined />}>Reject</Button>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    const poColumns = [
        { title: 'PO Number', dataIndex: 'id', key: 'id', render: (id) => <Text code>{id}</Text> },
        { title: 'Vendor', dataIndex: 'vendor', key: 'vendor' },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => <Text strong style={{ color: '#10b981' }}>${amount.toLocaleString()}</Text>
        },
        { title: 'Date', dataIndex: 'date', key: 'date', render: (d) => dayjs(d).format('MMM D, YYYY') },
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
            render: () => (
                <Space>
                    <Button type="text" icon={<EyeOutlined />} size="small" />
                    <Button type="text" icon={<DownloadOutlined />} size="small" />
                </Space>
            ),
        },
    ];

    const handleSubmit = () => {
        form.validateFields().then(values => {
            message.success('Expense report submitted successfully!');
            setIsModalOpen(false);
            form.resetFields();
        });
    };

    const tabItems = [
        {
            key: 'expenses',
            label: (
                <Badge count={2} offset={[10, 0]}>
                    Expense Reports
                </Badge>
            ),
            children: (
                <Table
                    columns={expenseColumns}
                    dataSource={expenses}
                    pagination={{ pageSize: 5 }}
                    className="department-table"
                />
            ),
        },
        {
            key: 'purchase-orders',
            label: 'Purchase Orders',
            children: (
                <Table
                    columns={poColumns}
                    dataSource={purchaseOrders}
                    pagination={{ pageSize: 5 }}
                    className="department-table"
                />
            ),
        },
        {
            key: 'budgets',
            label: 'Budgets',
            children: (
                <div className="empty-state">
                    <DollarOutlined style={{ fontSize: 48, color: '#10b981' }} />
                    <Title level={4}>Budget Overview</Title>
                    <Text type="secondary">Q1 2026 budget allocation</Text>
                </div>
            ),
        },
    ];

    return (
        <div className="department-page">
            <div className="page-header">
                <div>
                    <Title level={2} className="page-title">
                        <BankOutlined className="title-icon" />
                        <span className="gradient-text-finance">Finance Department</span>
                    </Title>
                    <Text type="secondary">Manage expenses, budgets, and financial operations</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                    Submit Expense
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
                                prefix={stat.prefix}
                                suffix={stat.suffix}
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
                    <Card className="side-card" title="Recent Transactions">
                        <List
                            dataSource={transactions}
                            renderItem={(item) => (
                                <List.Item className="activity-item">
                                    <div style={{ width: '100%' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Text style={{ color: '#fff', fontSize: 13 }}>{item.description}</Text>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                                            <Text style={{
                                                color: item.type === 'income' ? '#10b981' : '#ef4444',
                                                fontWeight: 600
                                            }}>
                                                {item.type === 'income' ? '+' : '-'}${item.amount.toLocaleString()}
                                            </Text>
                                            <Text type="secondary" style={{ fontSize: 11 }}>
                                                {item.time}
                                            </Text>
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Modal */}
            <Modal
                title="Submit Expense Report"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSubmit}
                className="department-modal"
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                        <Select placeholder="Select category">
                            <Select.Option value="travel">Travel</Select.Option>
                            <Select.Option value="marketing">Marketing</Select.Option>
                            <Select.Option value="equipment">Equipment</Select.Option>
                            <Select.Option value="training">Training</Select.Option>
                            <Select.Option value="supplies">Office Supplies</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="amount" label="Amount ($)" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} min={0} placeholder="Enter amount" />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <TextArea rows={3} placeholder="Describe the expense" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Finance;
