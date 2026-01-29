import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const notificationApi = axios.create({
    baseURL: `${API_BASE_URL}/notifications`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
notificationApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Notification API Functions

/**
 * Fetch all notifications for the current user
 * @param {Object} params - Query parameters
 * @param {string} params.type - Filter by notification type (hr, finance, forms)
 * @param {boolean} params.unreadOnly - Only fetch unread notifications
 * @param {number} params.page - Page number for pagination
 * @param {number} params.limit - Number of items per page
 */
export const getNotifications = async (params = {}) => {
    try {
        const response = await notificationApi.get('/', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch notifications' };
    }
};

/**
 * Get unread notification count
 */
export const getUnreadCount = async () => {
    try {
        const response = await notificationApi.get('/unread-count');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch unread count' };
    }
};

/**
 * Mark a single notification as read
 * @param {string} notificationId - The notification ID
 */
export const markAsRead = async (notificationId) => {
    try {
        const response = await notificationApi.patch(`/${notificationId}/read`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to mark notification as read' };
    }
};

/**
 * Mark all notifications as read
 */
export const markAllAsRead = async () => {
    try {
        const response = await notificationApi.patch('/read-all');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to mark all notifications as read' };
    }
};

/**
 * Delete a notification
 * @param {string} notificationId - The notification ID
 */
export const deleteNotification = async (notificationId) => {
    try {
        const response = await notificationApi.delete(`/${notificationId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to delete notification' };
    }
};

/**
 * Get notifications by department
 * @param {string} department - Department type (hr, finance, it, customer_service)
 */
export const getNotificationsByDepartment = async (department) => {
    try {
        const response = await notificationApi.get(`/department/${department}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch department notifications' };
    }
};

export default notificationApi;
