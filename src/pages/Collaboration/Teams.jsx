import { useState } from 'react';
import {
    Card, Row, Col, Avatar, Typography, Button, Input,
    List, Tag, Space, Badge, Modal, Form, Select, message
} from 'antd';
import {
    TeamOutlined,
    PlusOutlined,
    SearchOutlined,
    UserOutlined,
    MessageOutlined,
    SettingOutlined,
    UsergroupAddOutlined,
    CrownOutlined,
} from '@ant-design/icons';
import './Teams.css';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { TextArea } = Input;

const Teams = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [form] = Form.useForm();

    // Teams data
    const teams = [
        {
            id: 1,
            name: 'Engineering',
            description: 'Product development and technical infrastructure',
            members: 24,
            lead: 'John Tech',
            color: '#6366f1',
            avatar: '⚙️',
            online: 18,
        },
        {
            id: 2,
            name: 'Marketing',
            description: 'Brand strategy and market growth initiatives',
            members: 12,
            lead: 'Sarah Brand',
            color: '#ec4899',
            avatar: '📣',
            online: 8,
        },
        {
            id: 3,
            name: 'Sales',
            description: 'Revenue generation and client relationships',
            members: 18,
            lead: 'Mike Sales',
            color: '#10b981',
            avatar: '💼',
            online: 12,
        },
        {
            id: 4,
            name: 'HR Operations',
            description: 'People management and organizational culture',
            members: 8,
            lead: 'Emily People',
            color: '#f59e0b',
            avatar: '👥',
            online: 6,
        },
        {
            id: 5,
            name: 'Finance',
            description: 'Financial planning and business analytics',
            members: 10,
            lead: 'David Finance',
            color: '#3b82f6',
            avatar: '📊',
            online: 7,
        },
        {
            id: 6,
            name: 'Customer Success',
            description: 'Client support and satisfaction management',
            members: 15,
            lead: 'Lisa Support',
            color: '#8b5cf6',
            avatar: '🎯',
            online: 11,
        },
        {
            id: 7,
            name: 'Product Design',
            description: 'User experience and interface design',
            members: 9,
            lead: 'Alex Design',
            color: '#14b8a6',
            avatar: '🎨',
            online: 5,
        },
        {
            id: 8,
            name: 'DevOps',
            description: 'Infrastructure and deployment automation',
            members: 6,
            lead: 'Chris Ops',
            color: '#f97316',
            avatar: '🚀',
            online: 4,
        },
    ];

    // Recent activities
    const activities = [
        { team: 'Engineering', action: 'Sprint planning completed', time: '10 min ago' },
        { team: 'Marketing', action: 'New campaign launched', time: '1 hour ago' },
        { team: 'Sales', action: 'Q1 targets achieved', time: '2 hours ago' },
        { team: 'HR', action: 'New team member onboarded', time: '3 hours ago' },
    ];

    const handleTeamClick = (team) => {
        setSelectedTeam(team);
    };

    const handleCreateTeam = () => {
        form.validateFields().then(values => {
            message.success(`Team "${values.name}" created successfully!`);
            setIsModalOpen(false);
            form.resetFields();
        });
    };

    return (
        <div className="teams-page">
            <div className="page-header">
                <div>
                    <Title level={2} className="page-title">
                        <UsergroupAddOutlined className="title-icon" />
                        <span className="gradient-text">Teams</span>
                    </Title>
                    <Text type="secondary">Collaborate with your team members and manage groups</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                    Create Team
                </Button>
            </div>

            {/* Stats */}
            <Row gutter={[24, 24]} className="stats-row">
                <Col xs={24} sm={8}>
                    <Card className="stat-card">
                        <div className="stat-icon" style={{ background: '#6366f120', color: '#6366f1' }}>
                            <TeamOutlined />
                        </div>
                        <div>
                            <Text type="secondary">Total Teams</Text>
                            <Title level={3} style={{ color: '#fff', margin: 0 }}>{teams.length}</Title>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card className="stat-card">
                        <div className="stat-icon" style={{ background: '#10b98120', color: '#10b981' }}>
                            <UserOutlined />
                        </div>
                        <div>
                            <Text type="secondary">Total Members</Text>
                            <Title level={3} style={{ color: '#fff', margin: 0 }}>
                                {teams.reduce((acc, t) => acc + t.members, 0)}
                            </Title>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card className="stat-card">
                        <div className="stat-icon" style={{ background: '#ec489920', color: '#ec4899' }}>
                            <Badge status="success" />
                        </div>
                        <div>
                            <Text type="secondary">Online Now</Text>
                            <Title level={3} style={{ color: '#fff', margin: 0 }}>
                                {teams.reduce((acc, t) => acc + t.online, 0)}
                            </Title>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Search */}
            <div className="search-section">
                <Search
                    placeholder="Search teams..."
                    allowClear
                    prefix={<SearchOutlined />}
                    className="team-search"
                />
            </div>

            <Row gutter={[24, 24]}>
                {/* Teams Grid */}
                <Col xs={24} lg={18}>
                    <div className="teams-grid">
                        {teams.map((team) => (
                            <Card
                                key={team.id}
                                className={`team-card ${selectedTeam?.id === team.id ? 'selected' : ''}`}
                                onClick={() => handleTeamClick(team)}
                            >
                                <div className="team-header">
                                    <div
                                        className="team-avatar"
                                        style={{ background: `${team.color}20` }}
                                    >
                                        <span>{team.avatar}</span>
                                    </div>
                                    <div className="team-info">
                                        <Title level={5} style={{ color: '#fff', margin: 0 }}>{team.name}</Title>
                                        <div className="team-meta">
                                            <Badge status="success" />
                                            <Text type="secondary">{team.online} online</Text>
                                        </div>
                                    </div>
                                </div>

                                <Paragraph type="secondary" ellipsis={{ rows: 2 }} className="team-description">
                                    {team.description}
                                </Paragraph>

                                <div className="team-footer">
                                    <div className="team-members">
                                        <Avatar.Group maxCount={4} size="small">
                                            {[...Array(Math.min(team.members, 5))].map((_, i) => (
                                                <Avatar
                                                    key={i}
                                                    style={{
                                                        background: `hsl(${(i * 50) + 200}, 70%, 50%)`
                                                    }}
                                                >
                                                    {String.fromCharCode(65 + i)}
                                                </Avatar>
                                            ))}
                                        </Avatar.Group>
                                        <Text type="secondary">{team.members} members</Text>
                                    </div>
                                    <div className="team-lead">
                                        <CrownOutlined style={{ color: '#f59e0b' }} />
                                        <Text type="secondary">{team.lead}</Text>
                                    </div>
                                </div>

                                <div className="team-actions">
                                    <Button type="text" icon={<MessageOutlined />} size="small">
                                        Chat
                                    </Button>
                                    <Button type="text" icon={<SettingOutlined />} size="small">
                                        Settings
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Col>

                {/* Activity Sidebar */}
                <Col xs={24} lg={6}>
                    <Card className="activity-card" title="Recent Activity">
                        <List
                            dataSource={activities}
                            renderItem={(item) => (
                                <List.Item className="activity-item">
                                    <div>
                                        <Tag color="blue">{item.team}</Tag>
                                        <Text style={{ color: '#fff', display: 'block', marginTop: 4 }}>
                                            {item.action}
                                        </Text>
                                        <Text type="secondary" style={{ fontSize: 11 }}>{item.time}</Text>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>

                    {selectedTeam && (
                        <Card className="detail-card" title={`${selectedTeam.name} Details`}>
                            <div className="detail-content">
                                <div className="detail-avatar" style={{ background: `${selectedTeam.color}20` }}>
                                    {selectedTeam.avatar}
                                </div>
                                <Title level={4} style={{ color: '#fff', marginTop: 16 }}>
                                    {selectedTeam.name}
                                </Title>
                                <Paragraph type="secondary">{selectedTeam.description}</Paragraph>

                                <div className="detail-stats">
                                    <div className="detail-stat">
                                        <Text type="secondary">Members</Text>
                                        <Text style={{ color: '#fff' }}>{selectedTeam.members}</Text>
                                    </div>
                                    <div className="detail-stat">
                                        <Text type="secondary">Online</Text>
                                        <Text style={{ color: '#10b981' }}>{selectedTeam.online}</Text>
                                    </div>
                                    <div className="detail-stat">
                                        <Text type="secondary">Lead</Text>
                                        <Text style={{ color: '#fff' }}>{selectedTeam.lead}</Text>
                                    </div>
                                </div>

                                <Button type="primary" block style={{ marginTop: 16 }}>
                                    <MessageOutlined /> Open Chat
                                </Button>
                            </div>
                        </Card>
                    )}
                </Col>
            </Row>

            {/* Create Team Modal */}
            <Modal
                title="Create New Team"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleCreateTeam}
                className="teams-modal"
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Team Name" rules={[{ required: true }]}>
                        <Input placeholder="Enter team name" />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <TextArea rows={3} placeholder="Describe the team's purpose" />
                    </Form.Item>
                    <Form.Item name="lead" label="Team Lead" rules={[{ required: true }]}>
                        <Select placeholder="Select team lead">
                            <Select.Option value="john">John Smith</Select.Option>
                            <Select.Option value="sarah">Sarah Johnson</Select.Option>
                            <Select.Option value="mike">Mike Chen</Select.Option>
                            <Select.Option value="emily">Emily Davis</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="members" label="Initial Members">
                        <Select mode="multiple" placeholder="Add team members">
                            <Select.Option value="1">Alex Kim</Select.Option>
                            <Select.Option value="2">David Wilson</Select.Option>
                            <Select.Option value="3">Lisa Anderson</Select.Option>
                            <Select.Option value="4">Chris Taylor</Select.Option>
                            <Select.Option value="5">Rachel Brown</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Teams;
