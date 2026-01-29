import { Row, Col, Card, Statistic, Progress, Typography, Table, Tag, List, Avatar, Space } from 'antd';
import {
    TeamOutlined,
    FormOutlined,
    BellOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    RiseOutlined,
    FileTextOutlined,
    UserOutlined,
    DollarOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import './Dashboard.css';

const { Title, Text } = Typography;

const Dashboard = () => {
    const navigate = useNavigate();

    // Stats data
    const stats = [
        {
            title: 'Total Employees',
            value: 1248,
            prefix: <TeamOutlined />,
            suffix: <RiseOutlined style={{ color: '#10b981', fontSize: 16 }} />,
            change: '+12%',
            changeType: 'increase',
            color: '#6366f1',
        },
        {
            title: 'Pending Forms',
            value: 47,
            prefix: <FormOutlined />,
            suffix: null,
            change: '12 urgent',
            changeType: 'warning',
            color: '#f59e0b',
        },
        {
            title: 'Active Notifications',
            value: 89,
            prefix: <BellOutlined />,
            suffix: null,
            change: '23 unread',
            changeType: 'info',
            color: '#ec4899',
        },
        {
            title: 'Completed This Week',
            value: 156,
            prefix: <CheckCircleOutlined />,
            suffix: <RiseOutlined style={{ color: '#10b981', fontSize: 16 }} />,
            change: '+28%',
            changeType: 'increase',
            color: '#10b981',
        },
    ];

    // Department overview data
    const departments = [
        { name: 'HR', tasks: 24, completed: 18, color: '#6366f1' },
        { name: 'Finance', tasks: 32, completed: 28, color: '#10b981' },
        { name: 'IT', tasks: 45, completed: 38, color: '#f59e0b' },
        { name: 'Customer Service', tasks: 28, completed: 22, color: '#ec4899' },
    ];

    // Recent activities
    const recentActivities = [
        {
            id: 1,
            user: 'Sarah Johnson',
            action: 'submitted a leave request',
            department: 'HR',
            time: '5 minutes ago',
            avatar: 'SJ',
        },
        {
            id: 2,
            user: 'Mike Chen',
            action: 'approved expense report #1234',
            department: 'Finance',
            time: '15 minutes ago',
            avatar: 'MC',
        },
        {
            id: 3,
            user: 'Emily Davis',
            action: 'created new onboarding form',
            department: 'HR',
            time: '1 hour ago',
            avatar: 'ED',
        },
        {
            id: 4,
            user: 'Alex Kim',
            action: 'resolved support ticket #567',
            department: 'Customer Service',
            time: '2 hours ago',
            avatar: 'AK',
        },
        {
            id: 5,
            user: 'David Wilson',
            action: 'updated IT security policy',
            department: 'IT',
            time: '3 hours ago',
            avatar: 'DW',
        },
    ];

    // Pending approvals
    const pendingApprovals = [
        {
            key: '1',
            title: 'Leave Request - John Smith',
            type: 'HR',
            priority: 'high',
            submitted: '2026-01-28',
        },
        {
            key: '2',
            title: 'Expense Report - Marketing Event',
            type: 'Finance',
            priority: 'medium',
            submitted: '2026-01-27',
        },
        {
            key: '3',
            title: 'Equipment Request - New Laptop',
            type: 'IT',
            priority: 'low',
            submitted: '2026-01-26',
        },
        {
            key: '4',
            title: 'Travel Request - Client Meeting',
            type: 'HR',
            priority: 'high',
            submitted: '2026-01-25',
        },
    ];

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'success';
            default: return 'default';
        }
    };

    const getDeptColor = (dept) => {
        const colors = {
            HR: '#6366f1',
            Finance: '#10b981',
            IT: '#f59e0b',
            'Customer Service': '#ec4899',
        };
        return colors[dept] || '#3b82f6';
    };

    const columns = [
        {
            title: 'Request',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <Text strong style={{ color: '#fff' }}>{text}</Text>,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type) => (
                <Tag style={{ background: getDeptColor(type), border: 'none', color: '#fff' }}>
                    {type}
                </Tag>
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
        {
            title: 'Submitted',
            dataIndex: 'submitted',
            key: 'submitted',
            render: (date) => <Text type="secondary">{dayjs(date).format('MMM D, YYYY')}</Text>,
        },
    ];

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <div>
                    <Title level={2} className="dashboard-title">
                        Welcome back, <span className="gradient-text">John</span>! 👋
                    </Title>
                    <Text type="secondary">Here's what's happening in your organization today.</Text>
                </div>
                <div className="dashboard-date">
                    <Text type="secondary">
                        <ClockCircleOutlined style={{ marginRight: 8 }} />
                        {dayjs().format('dddd, MMMM D, YYYY')}
                    </Text>
                </div>
            </div>

            {/* Stats Cards */}
            <Row gutter={[24, 24]} className="stats-row">
                {stats.map((stat, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <Card className="stat-card" hoverable>
                            <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                                {stat.prefix}
                            </div>
                            <Statistic
                                title={stat.title}
                                value={stat.value}
                                valueStyle={{ color: '#fff', fontWeight: 700 }}
                            />
                            <div className="stat-change">
                                <Text className={`change-${stat.changeType}`}>
                                    {stat.suffix} {stat.change}
                                </Text>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Department Overview & Recent Activity */}
            <Row gutter={[24, 24]} className="content-row">
                <Col xs={24} lg={16}>
                    <Card className="dashboard-card" title="Department Overview">
                        <div className="departments-grid">
                            {departments.map((dept, index) => (
                                <div key={index} className="department-item">
                                    <div className="department-header">
                                        <Text strong style={{ color: '#fff' }}>{dept.name}</Text>
                                        <Text type="secondary">{dept.completed}/{dept.tasks} tasks</Text>
                                    </div>
                                    <Progress
                                        percent={Math.round((dept.completed / dept.tasks) * 100)}
                                        strokeColor={dept.color}
                                        trailColor="rgba(255,255,255,0.1)"
                                        showInfo={false}
                                    />
                                    <div className="department-stats">
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            {Math.round((dept.completed / dept.tasks) * 100)}% complete
                                        </Text>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card className="dashboard-card" title="Recent Activity">
                        <List
                            className="activity-list"
                            dataSource={recentActivities}
                            renderItem={(item) => (
                                <List.Item className="activity-item">
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                style={{
                                                    background: `linear-gradient(135deg, ${getDeptColor(item.department)}, #a855f7)`
                                                }}
                                            >
                                                {item.avatar}
                                            </Avatar>
                                        }
                                        title={<Text style={{ color: '#fff' }}>{item.user}</Text>}
                                        description={
                                            <Space direction="vertical" size={2}>
                                                <Text type="secondary" style={{ fontSize: 13 }}>{item.action}</Text>
                                                <Text type="secondary" style={{ fontSize: 11 }}>
                                                    <ClockCircleOutlined /> {item.time}
                                                </Text>
                                            </Space>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Pending Approvals & Quick Links */}
            <Row gutter={[24, 24]} className="content-row">
                <Col xs={24} lg={16}>
                    <Card
                        className="dashboard-card"
                        title="Pending Approvals"
                        extra={<a onClick={() => navigate('/workflow/forms')}>View All</a>}
                    >
                        <Table
                            columns={columns}
                            dataSource={pendingApprovals}
                            pagination={false}
                            className="pending-table"
                        />
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card className="dashboard-card" title="Quick Links">
                        <div className="quick-links">
                            {[
                                { icon: <FileTextOutlined />, label: 'New Form', path: '/workflow/forms', color: '#6366f1' },
                                { icon: <UserOutlined />, label: 'HR Portal', path: '/departments/hr', color: '#10b981' },
                                { icon: <DollarOutlined />, label: 'Finance', path: '/departments/finance', color: '#f59e0b' },
                                { icon: <SettingOutlined />, label: 'IT Support', path: '/departments/it', color: '#ec4899' },
                            ].map((link, index) => (
                                <div
                                    key={index}
                                    className="quick-link-item"
                                    onClick={() => navigate(link.path)}
                                    style={{ '--link-color': link.color }}
                                >
                                    <div className="quick-link-icon" style={{ background: `${link.color}20`, color: link.color }}>
                                        {link.icon}
                                    </div>
                                    <Text style={{ color: '#fff' }}>{link.label}</Text>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
