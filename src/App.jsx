import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';

// Context
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Layout
import AppLayout from './components/layout/AppLayout';

// Pages
import Dashboard from './pages/Dashboard';
import HR from './pages/Departments/HR';
import Finance from './pages/Departments/Finance';
import CustomerService from './pages/Departments/CustomerService';
import IT from './pages/Departments/IT';
import Forms from './pages/Workflow/Forms';
import MicrosoftTeams from './pages/Collaboration/MicrosoftTeams';
import NotificationList from './components/notifications/NotificationList';

// Styles
import './App.css';

// Theme configuration component
const ThemedApp = () => {
  const { isDark } = useTheme();

  // Light theme tokens
  const lightTheme = {
    colorPrimary: '#5059C9',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f5f7fa',
    borderRadius: 12,
    colorBorder: '#e8e8e8',
    colorText: '#1f2937',
    colorTextSecondary: '#6b7280',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  };

  // Dark theme tokens
  const darkTheme = {
    colorPrimary: '#6366f1',
    colorBgContainer: 'rgba(30, 30, 50, 0.95)',
    colorBgElevated: 'rgba(30, 30, 50, 0.98)',
    colorBgLayout: '#0f0f23',
    borderRadius: 12,
    colorBorder: 'rgba(255, 255, 255, 0.08)',
    colorText: 'rgba(255, 255, 255, 0.85)',
    colorTextSecondary: 'rgba(255, 255, 255, 0.6)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: isDark ? darkTheme : lightTheme,
        components: {
          Button: {
            primaryColor: '#fff',
            colorPrimary: isDark ? '#6366f1' : '#5059C9',
            colorPrimaryHover: isDark ? '#818cf8' : '#6366f1',
            borderRadius: 10,
          },
          Card: {
            colorBgContainer: isDark ? 'rgba(30, 30, 50, 0.9)' : '#ffffff',
          },
          Table: {
            colorBgContainer: 'transparent',
            headerBg: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(80, 89, 201, 0.08)',
          },
          Menu: {
            darkItemBg: 'transparent',
            darkSubMenuItemBg: 'transparent',
          },
          Input: {
            colorBgContainer: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
          },
          Select: {
            colorBgContainer: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
          },
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />

            {/* Departments */}
            <Route path="departments">
              <Route path="hr" element={<HR />} />
              <Route path="finance" element={<Finance />} />
              <Route path="customer-service" element={<CustomerService />} />
              <Route path="it" element={<IT />} />
            </Route>

            {/* Workflow */}
            <Route path="workflow">
              <Route path="forms" element={<Forms />} />
            </Route>

            {/* Collaboration - Microsoft Teams */}
            <Route path="collaboration">
              <Route path="teams" element={<MicrosoftTeams />} />
            </Route>

            {/* Notifications */}
            <Route path="notifications" element={<NotificationList />} />

            {/* Settings - placeholder */}
            <Route path="settings" element={<Dashboard />} />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default App;
