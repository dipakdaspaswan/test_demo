import { useState } from 'react';
import {
    Card, Row, Col, Avatar, Typography, Button, Input,
    List, Tag, Space, Badge, Modal, Tabs, Tooltip, message
} from 'antd';
import {
    TeamOutlined,
    VideoCameraOutlined,
    PhoneOutlined,
    MessageOutlined,
    CalendarOutlined,
    FileOutlined,
    PlusOutlined,
    SearchOutlined,
    MoreOutlined,
    UserAddOutlined,
    SettingOutlined,
    BellOutlined,
    LinkOutlined,
} from '@ant-design/icons';
import './MicrosoftTeams.css';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

// Microsoft Teams Logo SVG
const TeamsLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M20.5 5.5H16V3C16 2.45 15.55 2 15 2H9C8.45 2 8 2.45 8 3V5.5H3.5C2.67 5.5 2 6.17 2 7V19C2 19.83 2.67 20.5 3.5 20.5H20.5C21.33 20.5 22 19.83 22 19V7C22 6.17 21.33 5.5 20.5 5.5Z" fill="#5059C9" />
        <circle cx="17" cy="4" r="2.5" fill="#5059C9" />
        <path d="M14 9H6V17H14V9Z" fill="#7B83EB" />
    </svg>
);

const MicrosoftTeams = () => {
    const [activeTab, setActiveTab] = useState('teams');
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [isCallModalOpen, setIsCallModalOpen] = useState(false);
    const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

    // Teams data
    const teams = [
        {
            id: 1,
            name: 'Engineering Team',
            description: 'Product development discussions',
            members: 24,
            channels: ['General', 'Development', 'Code Reviews', 'Deployments'],
            color: '#5059C9',
            lastActivity: '2 min ago',
            unread: 5,
        },
        {
            id: 2,
            name: 'Marketing',
            description: 'Brand strategy and campaigns',
            members: 12,
            channels: ['General', 'Campaigns', 'Analytics', 'Content'],
            color: '#E74856',
            lastActivity: '15 min ago',
            unread: 2,
        },
        {
            id: 3,
            name: 'Sales Operations',
            description: 'Sales team coordination',
            members: 18,
            channels: ['General', 'Leads', 'Deals', 'Training'],
            color: '#00A4EF',
            lastActivity: '1 hour ago',
            unread: 0,
        },
        {
            id: 4,
            name: 'HR Department',
            description: 'People management',
            members: 8,
            channels: ['General', 'Hiring', 'Policies', 'Events'],
            color: '#7FBA00',
            lastActivity: '3 hours ago',
            unread: 1,
        },
        {
            id: 5,
            name: 'Finance',
            description: 'Financial operations',
            members: 10,
            channels: ['General', 'Reports', 'Budgets', 'Approvals'],
            color: '#FFB900',
            lastActivity: '5 hours ago',
            unread: 0,
        },
        {
            id: 6,
            name: 'Customer Success',
            description: 'Client support coordination',
            members: 15,
            channels: ['General', 'Tickets', 'Escalations', 'Feedback'],
            color: '#8661C5',
            lastActivity: 'Yesterday',
            unread: 8,
        },
    ];

    // Recent chats
    const recentChats = [
        { id: 1, name: 'John Smith', message: 'Can you review the PR?', time: '2 min ago', online: true, unread: 2 },
        { id: 2, name: 'Sarah Johnson', message: 'Meeting at 3 PM confirmed', time: '15 min ago', online: true, unread: 0 },
        { id: 3, name: 'Mike Chen', message: 'Budget report is ready', time: '1 hour ago', online: false, unread: 1 },
        { id: 4, name: 'Emily Davis', message: 'Thanks for the update!', time: '3 hours ago', online: true, unread: 0 },
        { id: 5, name: 'Alex Kim', message: 'Let me check and get back', time: 'Yesterday', online: false, unread: 0 },
    ];

    // Upcoming meetings
    const meetings = [
        { id: 1, title: 'Sprint Planning', time: '10:00 AM', duration: '1 hour', team: 'Engineering', participants: 12 },
        { id: 2, title: 'Product Review', time: '2:00 PM', duration: '45 min', team: 'Marketing', participants: 8 },
        { id: 3, title: 'Weekly Standup', time: '4:00 PM', duration: '30 min', team: 'All Teams', participants: 25 },
    ];

    const handleStartCall = (type) => {
        message.success(`${type} call started!`);
        setIsCallModalOpen(false);
    };

    const handleScheduleMeeting = () => {
        message.success('Meeting scheduled successfully!');
        setIsMeetingModalOpen(false);
    };

    const tabItems = [
        {
            key: 'teams',
            label: (
                <Space>
                    <TeamOutlined />
                    Teams
                </Space>
            ),
            children: (
                <div className="teams-grid">
                    {teams.map((team) => (
                        <Card
                            key={team.id}
                            className={`team-card ${selectedTeam?.id === team.id ? 'selected' : ''}`}
                            onClick={() => setSelectedTeam(team)}
                        >
                            <div className="team-header">
                                <div
                                    className="team-avatar"
                                    style={{ background: team.color }}
                                >
                                    <TeamOutlined />
                                </div>
                                <div className="team-info">
                                    <div className="team-name-row">
                                        <Text strong className="team-name">{team.name}</Text>
                                        {team.unread > 0 && (
                                            <Badge count={team.unread} className="team-badge" />
                                        )}
                                    </div>
                                    <Text type="secondary" className="team-desc">{team.description}</Text>
                                </div>
                            </div>

                            <div className="team-channels">
                                {team.channels.slice(0, 3).map((channel, idx) => (
                                    <Tag key={idx} className="channel-tag"># {channel}</Tag>
                                ))}
                                {team.channels.length > 3 && (
                                    <Tag className="channel-tag">+{team.channels.length - 3}</Tag>
                                )}
                            </div>

                            <div className="team-footer">
                                <Space>
                                    <Avatar.Group maxCount={3} size="small">
                                        {[...Array(Math.min(team.members, 4))].map((_, i) => (
                                            <Avatar
                                                key={i}
                                                style={{ background: `hsl(${(i * 60) + 200}, 60%, 50%)` }}
                                                size="small"
                                            >
                                                {String.fromCharCode(65 + i)}
                                            </Avatar>
                                        ))}
                                    </Avatar.Group>
                                    <Text type="secondary" className="member-count">{team.members} members</Text>
                                </Space>
                                <Text type="secondary" className="last-activity">{team.lastActivity}</Text>
                            </div>
                        </Card>
                    ))}
                </div>
            ),
        },
        {
            key: 'chat',
            label: (
                <Space>
                    <MessageOutlined />
                    Chat
                    <Badge count={3} size="small" />
                </Space>
            ),
            children: (
                <div className="chat-section">
                    <div className="chat-list">
                        {recentChats.map((chat) => (
                            <div key={chat.id} className="chat-item">
                                <Badge dot={chat.online} status="success" offset={[-5, 30]}>
                                    <Avatar
                                        size={44}
                                        style={{ background: `hsl(${chat.id * 50}, 60%, 50%)` }}
                                    >
                                        {chat.name.split(' ').map(n => n[0]).join('')}
                                    </Avatar>
                                </Badge>
                                <div className="chat-content">
                                    <div className="chat-header">
                                        <Text strong className="chat-name">{chat.name}</Text>
                                        <Text type="secondary" className="chat-time">{chat.time}</Text>
                                    </div>
                                    <div className="chat-message-row">
                                        <Text type="secondary" className="chat-message" ellipsis>{chat.message}</Text>
                                        {chat.unread > 0 && <Badge count={chat.unread} size="small" />}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            key: 'calendar',
            label: (
                <Space>
                    <CalendarOutlined />
                    Calendar
                </Space>
            ),
            children: (
                <div className="calendar-section">
                    <div className="meetings-header">
                        <Title level={5}>Today's Meetings</Title>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsMeetingModalOpen(true)}>
                            New Meeting
                        </Button>
                    </div>
                    <div className="meetings-list">
                        {meetings.map((meeting) => (
                            <Card key={meeting.id} className="meeting-card">
                                <div className="meeting-content">
                                    <div className="meeting-time">
                                        <Text strong className="time">{meeting.time}</Text>
                                        <Text type="secondary">{meeting.duration}</Text>
                                    </div>
                                    <div className="meeting-info">
                                        <Text strong className="meeting-title">{meeting.title}</Text>
                                        <Text type="secondary">{meeting.team} • {meeting.participants} participants</Text>
                                    </div>
                                    <div className="meeting-actions">
                                        <Button type="primary" icon={<VideoCameraOutlined />}>
                                            Join
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            key: 'calls',
            label: (
                <Space>
                    <PhoneOutlined />
                    Calls
                </Space>
            ),
            children: (
                <div className="calls-section">
                    <div className="call-actions">
                        <Card className="call-action-card" hoverable onClick={() => setIsCallModalOpen(true)}>
                            <VideoCameraOutlined className="call-icon video" />
                            <Text strong>Start Video Call</Text>
                            <Text type="secondary">Meet face to face</Text>
                        </Card>
                        <Card className="call-action-card" hoverable onClick={() => setIsCallModalOpen(true)}>
                            <PhoneOutlined className="call-icon audio" />
                            <Text strong>Start Audio Call</Text>
                            <Text type="secondary">Voice only meeting</Text>
                        </Card>
                        <Card className="call-action-card" hoverable onClick={() => setIsMeetingModalOpen(true)}>
                            <CalendarOutlined className="call-icon schedule" />
                            <Text strong>Schedule Meeting</Text>
                            <Text type="secondary">Plan ahead</Text>
                        </Card>
                    </div>

                    <Title level={5} style={{ marginTop: 24 }}>Quick Dial</Title>
                    <div className="quick-dial-list">
                        {recentChats.slice(0, 4).map((contact) => (
                            <div key={contact.id} className="quick-dial-item">
                                <Badge dot={contact.online} status="success" offset={[-5, 30]}>
                                    <Avatar
                                        size={48}
                                        style={{ background: `hsl(${contact.id * 50}, 60%, 50%)` }}
                                    >
                                        {contact.name.split(' ').map(n => n[0]).join('')}
                                    </Avatar>
                                </Badge>
                                <Text className="contact-name">{contact.name.split(' ')[0]}</Text>
                                <Space>
                                    <Button type="text" icon={<VideoCameraOutlined />} shape="circle" />
                                    <Button type="text" icon={<PhoneOutlined />} shape="circle" />
                                </Space>
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            key: 'files',
            label: (
                <Space>
                    <FileOutlined />
                    Files
                </Space>
            ),
            children: (
                <div className="files-section">
                    <div className="files-empty">
                        <FileOutlined className="files-icon" />
                        <Title level={4}>Shared Files</Title>
                        <Text type="secondary">Files shared in your teams and chats will appear here</Text>
                        <Button type="primary" icon={<LinkOutlined />} style={{ marginTop: 16 }}>
                            Connect OneDrive
                        </Button>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="teams-page">
            <div className="page-header">
                <div className="header-left">
                    <div className="teams-logo">
                        <TeamsLogo />
                    </div>
                    <div>
                        <Title level={2} className="page-title">
                            <span className="teams-title">Microsoft Teams</span>
                        </Title>
                        <Text type="secondary">Connect and collaborate with your team</Text>
                    </div>
                </div>
                <Space>
                    <Search placeholder="Search..." className="teams-search" style={{ width: 250 }} />
                    <Tooltip title="Notifications">
                        <Button type="text" icon={<BellOutlined />} />
                    </Tooltip>
                    <Tooltip title="Settings">
                        <Button type="text" icon={<SettingOutlined />} />
                    </Tooltip>
                </Space>
            </div>

            {/* Quick Actions */}
            <Row gutter={[16, 16]} className="quick-actions">
                <Col xs={24} sm={8}>
                    <Card className="action-card meet" hoverable onClick={() => setIsCallModalOpen(true)}>
                        <VideoCameraOutlined className="action-icon" />
                        <div>
                            <Text strong>Meet Now</Text>
                            <Text type="secondary">Start instant meeting</Text>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card className="action-card new-team" hoverable>
                        <UserAddOutlined className="action-icon" />
                        <div>
                            <Text strong>Create Team</Text>
                            <Text type="secondary">Start a new team</Text>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card className="action-card schedule" hoverable onClick={() => setIsMeetingModalOpen(true)}>
                        <CalendarOutlined className="action-icon" />
                        <div>
                            <Text strong>Schedule</Text>
                            <Text type="secondary">Plan a meeting</Text>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Main Content */}
            <Card className="main-card">
                <Tabs
                    items={tabItems}
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    className="teams-tabs"
                />
            </Card>

            {/* Call Modal */}
            <Modal
                title="Start a Call"
                open={isCallModalOpen}
                onCancel={() => setIsCallModalOpen(false)}
                footer={null}
                className="teams-modal"
            >
                <div className="call-modal-content">
                    <Button
                        type="primary"
                        size="large"
                        icon={<VideoCameraOutlined />}
                        onClick={() => handleStartCall('Video')}
                        block
                    >
                        Start Video Call
                    </Button>
                    <Button
                        size="large"
                        icon={<PhoneOutlined />}
                        onClick={() => handleStartCall('Audio')}
                        block
                        style={{ marginTop: 12 }}
                    >
                        Start Audio Call
                    </Button>
                </div>
            </Modal>

            {/* Schedule Meeting Modal */}
            <Modal
                title="Schedule Meeting"
                open={isMeetingModalOpen}
                onCancel={() => setIsMeetingModalOpen(false)}
                onOk={handleScheduleMeeting}
                okText="Schedule"
                className="teams-modal"
            >
                <div className="meeting-modal-content">
                    <Input placeholder="Meeting title" style={{ marginBottom: 16 }} />
                    <Input placeholder="Add required attendees" style={{ marginBottom: 16 }} />
                    <Input.TextArea placeholder="Add details" rows={3} />
                </div>
            </Modal>
        </div>
    );
};

export default MicrosoftTeams;
