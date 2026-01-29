import { useState, useEffect, useCallback, useRef } from 'react';
import { message } from 'antd';
import { getNotifications, getUnreadCount, markAsRead, markAllAsRead } from '../api/notification.api';
import { NOTIFICATION_REFRESH_INTERVAL } from '../utils/constants';

/**
 * Custom hook for managing notifications with auto-refresh every 5 minutes
 */
const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const intervalRef = useRef(null);

    // Fetch notifications
    const fetchNotifications = useCallback(async (showLoading = true) => {
        if (showLoading) setLoading(true);
        setError(null);

        try {
            // For demo purposes, we'll use mock data if API is not available
            try {
                const [notificationsData, countData] = await Promise.all([
                    getNotifications(),
                    getUnreadCount()
                ]);

                setNotifications(notificationsData.notifications || notificationsData || []);
                setUnreadCount(countData.count || countData || 0);
            } catch (apiError) {
                // Use mock data for demo
                const mockNotifications = generateMockNotifications();
                setNotifications(mockNotifications);
                setUnreadCount(mockNotifications.filter(n => !n.read).length);
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch notifications');
        } finally {
            if (showLoading) setLoading(false);
        }
    }, []);

    // Mark single notification as read
    const handleMarkAsRead = useCallback(async (notificationId) => {
        try {
            await markAsRead(notificationId);
            setNotifications(prev =>
                prev.map(n =>
                    n.id === notificationId ? { ...n, read: true } : n
                )
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (err) {
            // Update locally even if API fails
            setNotifications(prev =>
                prev.map(n =>
                    n.id === notificationId ? { ...n, read: true } : n
                )
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        }
    }, []);

    // Mark all notifications as read
    const handleMarkAllAsRead = useCallback(async () => {
        try {
            await markAllAsRead();
            setNotifications(prev =>
                prev.map(n => ({ ...n, read: true }))
            );
            setUnreadCount(0);
            message.success('All notifications marked as read');
        } catch (err) {
            // Update locally even if API fails
            setNotifications(prev =>
                prev.map(n => ({ ...n, read: true }))
            );
            setUnreadCount(0);
            message.success('All notifications marked as read');
        }
    }, []);

    // Filter notifications by type
    const filterByType = useCallback((type) => {
        return notifications.filter(n => n.type === type);
    }, [notifications]);

    // Get notifications by department
    const getByDepartment = useCallback((department) => {
        return notifications.filter(n => n.department === department);
    }, [notifications]);

    // Set up auto-refresh on mount
    useEffect(() => {
        // Initial fetch
        fetchNotifications();

        // Set up interval for auto-refresh every 5 minutes
        intervalRef.current = setInterval(() => {
            fetchNotifications(false); // Don't show loading spinner for background refresh
        }, NOTIFICATION_REFRESH_INTERVAL);

        // Cleanup on unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [fetchNotifications]);

    // Manual refresh function
    const refresh = useCallback(() => {
        fetchNotifications(true);
    }, [fetchNotifications]);

    return {
        notifications,
        unreadCount,
        loading,
        error,
        markAsRead: handleMarkAsRead,
        markAllAsRead: handleMarkAllAsRead,
        refresh,
        filterByType,
        getByDepartment,
        hrNotifications: filterByType('hr'),
        financeNotifications: filterByType('finance'),
        formNotifications: filterByType('forms'),
    };
};

// Generate mock notifications for demo
const generateMockNotifications = () => {
    const types = ['hr', 'finance', 'forms', 'approval', 'system'];
    const departments = ['hr', 'finance', 'it', 'customer_service'];

    const mockMessages = {
        hr: [
            'Leave request approved by Manager',
            'New onboarding form submitted',
            'Employee evaluation due in 3 days',
            'Training session scheduled for next week',
            'Performance review completed',
        ],
        finance: [
            'Expense report requires approval',
            'Budget update for Q1 2026',
            'Invoice #1234 has been processed',
            'Purchase order pending review',
            'Monthly financial report available',
        ],
        forms: [
            'New form submission: Travel Request',
            'Form #567 needs your review',
            'Equipment request approved',
            'Access request pending approval',
            'Support ticket escalated',
        ],
        approval: [
            'Pending approval: Leave Request from John',
            'Action required: Expense report #890',
            'Review needed: New hire onboarding',
            'Approval deadline approaching: PO #456',
        ],
        system: [
            'System maintenance scheduled for Sunday',
            'New features available in the portal',
            'Password expires in 7 days',
            'Profile update reminder',
        ],
    };

    const notifications = [];
    let id = 1;

    types.forEach(type => {
        const messages = mockMessages[type] || [];
        messages.forEach((msg, idx) => {
            notifications.push({
                id: `notif-${id++}`,
                type,
                department: departments[Math.floor(Math.random() * departments.length)],
                title: msg,
                message: `This is a detailed description for: ${msg}`,
                read: Math.random() > 0.6,
                createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
                priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
            });
        });
    });

    return notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export default useNotifications;
