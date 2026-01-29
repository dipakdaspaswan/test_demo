// Application Constants

export const APP_NAME = 'Enterprise Portal';

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Notification Settings
export const NOTIFICATION_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

// Department Types
export const DEPARTMENTS = {
    HR: 'hr',
    FINANCE: 'finance',
    CUSTOMER_SERVICE: 'customer_service',
    IT: 'it',
};

// Notification Types
export const NOTIFICATION_TYPES = {
    HR: 'hr',
    FINANCE: 'finance',
    FORMS: 'forms',
    APPROVAL: 'approval',
    SYSTEM: 'system',
};

// Workflow Form Status
export const FORM_STATUS = {
    DRAFT: 'draft',
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    IN_REVIEW: 'in_review',
};

// User Roles
export const USER_ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    EMPLOYEE: 'employee',
    VIEWER: 'viewer',
};

// Sidebar Menu Keys
export const MENU_KEYS = {
    DASHBOARD: 'dashboard',
    DEPARTMENTS: 'departments',
    HR: 'hr',
    FINANCE: 'finance',
    CUSTOMER_SERVICE: 'customer_service',
    IT: 'it',
    WORKFLOW: 'workflow',
    FORMS: 'forms',
    COLLABORATION: 'collaboration',
    TEAMS: 'teams',
};

// Workflow Form Categories
export const FORM_CATEGORIES = [
    { key: 'leave', label: 'Leave Requests', department: 'hr' },
    { key: 'expense', label: 'Expense Reports', department: 'finance' },
    { key: 'purchase', label: 'Purchase Orders', department: 'finance' },
    { key: 'onboarding', label: 'Employee Onboarding', department: 'hr' },
    { key: 'offboarding', label: 'Employee Offboarding', department: 'hr' },
    { key: 'travel', label: 'Travel Requests', department: 'hr' },
    { key: 'equipment', label: 'Equipment Requests', department: 'it' },
    { key: 'access', label: 'Access Requests', department: 'it' },
    { key: 'support', label: 'Support Tickets', department: 'customer_service' },
    { key: 'feedback', label: 'Customer Feedback', department: 'customer_service' },
];

// Table Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];
