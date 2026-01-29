import { useState } from 'react';
import {
    Card, Row, Col, Table, Tag, Button, Tabs, Statistic,
    Avatar, List, Space, Typography, Badge, Modal,
    Form, Input, Select, Steps, message, Tooltip, Empty
} from 'antd';
import {
    FormOutlined,
    FileAddOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined,
    PlusOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    SendOutlined,
    FileTextOutlined,
    AuditOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import './Forms.css';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Step } = Steps;

// Form templates
const FORM_TEMPLATES = [
    { key: 'leave', name: 'Leave Request', category: 'HR', icon: '🏖️' },
    { key: 'expense', name: 'Expense Report', category: 'Finance', icon: '💰' },
    { key: 'purchase', name: 'Purchase Order', category: 'Finance', icon: '🛒' },
    { key: 'travel', name: 'Travel Request', category: 'HR', icon: '✈️' },
    { key: 'equipment', name: 'Equipment Request', category: 'IT', icon: '💻' },
    { key: 'access', name: 'Access Request', category: 'IT', icon: '🔐' },
    { key: 'onboarding', name: 'New Hire Onboarding', category: 'HR', icon: '👋' },
    { key: 'offboarding', name: 'Employee Offboarding', category: 'HR', icon: '👋' },
    { key: 'training', name: 'Training Request', category: 'HR', icon: '📚' },
    { key: 'overtime', name: 'Overtime Approval', category: 'HR', icon: '⏰' },
    { key: 'reimbursement', name: 'Reimbursement', category: 'Finance', icon: '💵' },
    { key: 'budget', name: 'Budget Request', category: 'Finance', icon: '📊' },
    { key: 'vendor', name: 'Vendor Registration', category: 'Finance', icon: '🏢' },
    { key: 'maintenance', name: 'Maintenance Request', category: 'IT', icon: '🔧' },
    { key: 'software', name: 'Software License', category: 'IT', icon: '📦' },
    { key: 'feedback', name: 'Customer Feedback', category: 'Service', icon: '💬' },
    { key: 'complaint', name: 'Complaint Form', category: 'Service', icon: '📝' },
    { key: 'survey', name: 'Employee Survey', category: 'HR', icon: '📋' },
    { key: 'policy', name: 'Policy Exception', category: 'Admin', icon: '📄' },
    { key: 'contract', name: 'Contract Review', category: 'Legal', icon: '📜' },
    { key: 'timeoff', name: 'Time Off Request', category: 'HR', icon: '🌴' },
    { key: 'remote', name: 'Remote Work Request', category: 'HR', icon: '🏠' },
    { key: 'parking', name: 'Parking Request', category: 'Admin', icon: '🚗' },
    { key: 'badge', name: 'Badge Request', category: 'Security', icon: '🪪' },
    { key: 'incident', name: 'Incident Report', category: 'Security', icon: '🚨' },
    { key: 'safety', name: 'Safety Report', category: 'Security', icon: '⚠️' },
    { key: 'facility', name: 'Facility Request', category: 'Admin', icon: '🏛️' },
    { key: 'event', name: 'Event Request', category: 'Admin', icon: '🎉' },
    { key: 'referral', name: 'Employee Referral', category: 'HR', icon: '👥' },
    { key: 'promotion', name: 'Promotion Request', category: 'HR', icon: '📈' },
];

const Forms = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedForm, setSelectedForm] = useState(null);
    const [activeTab, setActiveTab] = useState('my-forms');
    const [form] = Form.useForm();

    // Stats
    const stats = [
        { title: 'My Submissions', value: 12, icon: <FileTextOutlined />, color: '#6366f1' },
        { title: 'Pending Approval', value: 5, icon: <ClockCircleOutlined />, color: '#f59e0b' },
        { title: 'Approved', value: 38, icon: <CheckCircleOutlined />, color: '#10b981' },
        { title: 'Awaiting Review', value: 8, icon: <AuditOutlined />, color: '#ec4899' },
    ];

    // My forms
    const myForms = [
        { key: '1', id: 'FRM-001', type: 'Leave Request', status: 'pending', submitted: '2026-01-29', approver: 'John Manager' },
        { key: '2', id: 'FRM-002', type: 'Expense Report', status: 'approved', submitted: '2026-01-28', approver: 'Finance Dept' },
        { key: '3', id: 'FRM-003', type: 'Equipment Request', status: 'in-review', submitted: '2026-01-27', approver: 'IT Manager' },
        { key: '4', id: 'FRM-004', type: 'Travel Request', status: 'rejected', submitted: '2026-01-25', approver: 'HR Manager' },
        { key: '5', id: 'FRM-005', type: 'Training Request', status: 'draft', submitted: '2026-01-24', approver: '-' },
    ];

    // Pending approvals
    const pendingApprovals = [
        { key: '1', id: 'FRM-101', type: 'Leave Request', submitter: 'Sarah Johnson', submitted: '2026-01-29T10:30:00', priority: 'high' },
        { key: '2', id: 'FRM-102', type: 'Expense Report', submitter: 'Mike Chen', submitted: '2026-01-29T09:15:00', priority: 'medium' },
        { key: '3', id: 'FRM-103', type: 'Purchase Order', submitter: 'Emily Davis', submitted: '2026-01-28T16:45:00', priority: 'high' },
        { key: '4', id: 'FRM-104', type: 'Access Request', submitter: 'Alex Kim', submitted: '2026-01-28T14:20:00', priority: 'low' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'success';
            case 'pending': return 'processing';
            case 'in-review': return 'warning';
            case 'rejected': return 'error';
            case 'draft': return 'default';
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

    const getCategoryColor = (category) => {
        switch (category) {
            case 'HR': return '#6366f1';
            case 'Finance': return '#10b981';
            case 'IT': return '#3b82f6';
            case 'Service': return '#ec4899';
            case 'Admin': return '#f59e0b';
            case 'Legal': return '#8b5cf6';
            case 'Security': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const myFormsColumns = [
        { title: 'Form ID', dataIndex: 'id', key: 'id', render: (id) => <Text code>{id}</Text> },
        { title: 'Type', dataIndex: 'type', key: 'type' },
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
        { title: 'Submitted', dataIndex: 'submitted', key: 'submitted', render: (d) => dayjs(d).format('MMM D, YYYY') },
        { title: 'Approver', dataIndex: 'approver', key: 'approver' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => handleViewForm(record)}
                    />
                    {record.status === 'draft' && (
                        <>
                            <Button type="text" icon={<EditOutlined />} size="small" />
                            <Button type="text" icon={<DeleteOutlined />} size="small" danger />
                        </>
                    )}
                </Space>
            ),
        },
    ];

    const approvalColumns = [
        { title: 'Form ID', dataIndex: 'id', key: 'id', render: (id) => <Text code>{id}</Text> },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        {
            title: 'Submitter',
            dataIndex: 'submitter',
            key: 'submitter',
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
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            render: (priority) => (
                <Tag color={getPriorityColor(priority)} style={{ textTransform: 'capitalize' }}>
                    {priority}
                </Tag>
            ),
        },
        { title: 'Submitted', dataIndex: 'submitted', key: 'submitted', render: (d) => dayjs(d).format('MMM D, HH:mm') },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <Space>
                    <Button type="primary" size="small" icon={<CheckCircleOutlined />}>Approve</Button>
                    <Button danger size="small" icon={<ExclamationCircleOutlined />}>Reject</Button>
                </Space>
            ),
        },
    ];

    const handleViewForm = (formData) => {
        setSelectedForm(formData);
        setIsViewModalOpen(true);
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            message.success('Form submitted successfully!');
            setIsModalOpen(false);
            form.resetFields();
        });
    };

    const tabItems = [
        {
            key: 'my-forms',
            label: 'My Forms',
            children: (
                <Table
                    columns={myFormsColumns}
                    dataSource={myForms}
                    pagination={{ pageSize: 5 }}
                    className="forms-table"
                />
            ),
        },
        {
            key: 'approvals',
            label: (
                <Badge count={4} offset={[10, 0]}>
                    Pending Approvals
                </Badge>
            ),
            children: (
                <Table
                    columns={approvalColumns}
                    dataSource={pendingApprovals}
                    pagination={{ pageSize: 5 }}
                    className="forms-table"
                />
            ),
        },
        {
            key: 'templates',
            label: 'Form Templates',
            children: (
                <div className="templates-grid">
                    {FORM_TEMPLATES.map((template) => (
                        <Card
                            key={template.key}
                            className="template-card"
                            onClick={() => {
                                form.setFieldValue('type', template.key);
                                setIsModalOpen(true);
                            }}
                        >
                            <div className="template-icon">{template.icon}</div>
                            <Text strong style={{ color: '#fff' }}>{template.name}</Text>
                            <Tag
                                style={{
                                    background: `${getCategoryColor(template.category)}20`,
                                    color: getCategoryColor(template.category),
                                    border: 'none',
                                    marginTop: 8,
                                }}
                            >
                                {template.category}
                            </Tag>
                        </Card>
                    ))}
                </div>
            ),
        },
    ];

    return (
        <div className="forms-page">
            <div className="page-header">
                <div>
                    <Title level={2} className="page-title">
                        <FormOutlined className="title-icon" />
                        <span className="gradient-text">Workflow Forms</span>
                    </Title>
                    <Text type="secondary">Create, submit, and track approval-based forms</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                    New Form
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
            <Card className="main-card">
                <Tabs
                    items={tabItems}
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    className="forms-tabs"
                />
            </Card>

            {/* Create Form Modal */}
            <Modal
                title="New Form Submission"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSubmit}
                okText="Submit for Approval"
                okButtonProps={{ icon: <SendOutlined /> }}
                width={600}
                className="forms-modal"
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="type" label="Form Type" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select form type"
                            showSearch
                            optionFilterProp="children"
                        >
                            {FORM_TEMPLATES.map((template) => (
                                <Select.Option key={template.key} value={template.key}>
                                    {template.icon} {template.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
                        <Select placeholder="Select priority">
                            <Select.Option value="high">High</Select.Option>
                            <Select.Option value="medium">Medium</Select.Option>
                            <Select.Option value="low">Low</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                        <Input placeholder="Enter a brief title for your request" />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <TextArea rows={4} placeholder="Provide detailed information about your request" />
                    </Form.Item>
                    <Form.Item name="approver" label="Approver">
                        <Select placeholder="Select approver (optional)">
                            <Select.Option value="manager">Direct Manager</Select.Option>
                            <Select.Option value="hr">HR Department</Select.Option>
                            <Select.Option value="finance">Finance Department</Select.Option>
                            <Select.Option value="it">IT Department</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            {/* View Form Modal */}
            <Modal
                title={`Form Details - ${selectedForm?.id}`}
                open={isViewModalOpen}
                onCancel={() => setIsViewModalOpen(false)}
                footer={[
                    <Button key="close" onClick={() => setIsViewModalOpen(false)}>
                        Close
                    </Button>,
                ]}
                width={600}
                className="forms-modal"
            >
                {selectedForm && (
                    <div className="form-details">
                        <div className="form-detail-row">
                            <Text type="secondary">Form ID:</Text>
                            <Text code>{selectedForm.id}</Text>
                        </div>
                        <div className="form-detail-row">
                            <Text type="secondary">Type:</Text>
                            <Text>{selectedForm.type}</Text>
                        </div>
                        <div className="form-detail-row">
                            <Text type="secondary">Status:</Text>
                            <Tag color={getStatusColor(selectedForm.status)}>
                                {selectedForm.status.replace('-', ' ')}
                            </Tag>
                        </div>
                        <div className="form-detail-row">
                            <Text type="secondary">Submitted:</Text>
                            <Text>{dayjs(selectedForm.submitted).format('MMMM D, YYYY')}</Text>
                        </div>
                        <div className="form-detail-row">
                            <Text type="secondary">Approver:</Text>
                            <Text>{selectedForm.approver}</Text>
                        </div>

                        <div className="approval-timeline">
                            <Title level={5} style={{ color: '#fff', marginTop: 24 }}>Approval Timeline</Title>
                            <Steps
                                direction="vertical"
                                size="small"
                                current={selectedForm.status === 'approved' ? 3 : selectedForm.status === 'pending' ? 1 : 0}
                                className="approval-steps"
                            >
                                <Step title="Submitted" description="Form submitted for review" />
                                <Step title="Under Review" description="Awaiting approval" />
                                <Step title="Approved/Rejected" description="Final decision" />
                            </Steps>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Forms;
