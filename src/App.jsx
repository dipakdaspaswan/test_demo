import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';

// Layout
import AppLayout from './components/layout/AppLayout';

// Pages
import Dashboard from './pages/Dashboard';
import HR from './pages/Departments/HR';
import Finance from './pages/Departments/Finance';
import CustomerService from './pages/Departments/CustomerService';
import IT from './pages/Departments/IT';
import Forms from './pages/Workflow/Forms';
import Teams from './pages/Collaboration/Teams';
import NotificationList from './components/notifications/NotificationList';

// Styles
import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#6366f1',
          colorBgContainer: 'rgba(26, 26, 46, 0.9)',
          colorBgElevated: 'rgba(26, 26, 46, 0.95)',
          borderRadius: 12,
          colorBorder: 'rgba(255, 255, 255, 0.08)',
          colorText: 'rgba(255, 255, 255, 0.85)',
          colorTextSecondary: 'rgba(255, 255, 255, 0.6)',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
        components: {
          Button: {
            primaryColor: '#fff',
            colorPrimary: '#6366f1',
            colorPrimaryHover: '#818cf8',
            borderRadius: 10,
          },
          Card: {
            colorBgContainer: 'transparent',
          },
          Table: {
            colorBgContainer: 'transparent',
            headerBg: 'rgba(99, 102, 241, 0.1)',
          },
          Menu: {
            darkItemBg: 'transparent',
            darkSubMenuItemBg: 'transparent',
          },
          Input: {
            colorBgContainer: 'rgba(255, 255, 255, 0.05)',
          },
          Select: {
            colorBgContainer: 'rgba(255, 255, 255, 0.05)',
          },
          Modal: {
            contentBg: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
            headerBg: 'transparent',
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

            {/* Collaboration */}
            <Route path="collaboration">
              <Route path="teams" element={<Teams />} />
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
}

export default App;
