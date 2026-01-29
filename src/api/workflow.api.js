import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const workflowApi = axios.create({
    baseURL: `${API_BASE_URL}/workflow`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
workflowApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Workflow API Functions

/**
 * Get all workflow forms
 * @param {Object} params - Query parameters
 * @param {string} params.status - Filter by status
 * @param {string} params.category - Filter by category
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 */
export const getForms = async (params = {}) => {
    try {
        const response = await workflowApi.get('/forms', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch forms' };
    }
};

/**
 * Get a single form by ID
 * @param {string} formId - Form ID
 */
export const getFormById = async (formId) => {
    try {
        const response = await workflowApi.get(`/forms/${formId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch form' };
    }
};

/**
 * Create a new form submission
 * @param {Object} formData - Form data
 */
export const createForm = async (formData) => {
    try {
        const response = await workflowApi.post('/forms', formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to create form' };
    }
};

/**
 * Update a form
 * @param {string} formId - Form ID
 * @param {Object} formData - Updated form data
 */
export const updateForm = async (formId, formData) => {
    try {
        const response = await workflowApi.put(`/forms/${formId}`, formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to update form' };
    }
};

/**
 * Submit a form for approval
 * @param {string} formId - Form ID
 */
export const submitForApproval = async (formId) => {
    try {
        const response = await workflowApi.post(`/forms/${formId}/submit`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to submit form' };
    }
};

/**
 * Approve a form
 * @param {string} formId - Form ID
 * @param {string} comments - Approval comments
 */
export const approveForm = async (formId, comments = '') => {
    try {
        const response = await workflowApi.post(`/forms/${formId}/approve`, { comments });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to approve form' };
    }
};

/**
 * Reject a form
 * @param {string} formId - Form ID
 * @param {string} reason - Rejection reason
 */
export const rejectForm = async (formId, reason) => {
    try {
        const response = await workflowApi.post(`/forms/${formId}/reject`, { reason });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to reject form' };
    }
};

/**
 * Get pending approvals for current user
 */
export const getPendingApprovals = async () => {
    try {
        const response = await workflowApi.get('/approvals/pending');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch pending approvals' };
    }
};

/**
 * Get approval history
 * @param {string} formId - Form ID
 */
export const getApprovalHistory = async (formId) => {
    try {
        const response = await workflowApi.get(`/forms/${formId}/history`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch approval history' };
    }
};

/**
 * Delete a form (draft only)
 * @param {string} formId - Form ID
 */
export const deleteForm = async (formId) => {
    try {
        const response = await workflowApi.delete(`/forms/${formId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to delete form' };
    }
};

export default workflowApi;
