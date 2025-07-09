import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import ProtectedRoute from './features/auth/ProtectedRoute';
import FeedbackDashboard from './features/feedback/FeedbackDashboard';
import TagManager from './features/tags/TagManager';
import AnalyticsCharts from './features/analytics/AnalyticsCharts';
import { useSelector } from 'react-redux';
import type { RootState } from './store';

function App() {
  const role = useSelector((state: RootState) => state.auth.role);
  return (
    <BrowserRouter>
      <div className="bg-light p-3 d-flex gap-3 align-items-center">
        <a href="/dashboard" className="text-primary text-decoration-underline">Dashboard</a>
        <a href="/analytics" className="text-primary text-decoration-underline">Analytics</a>
        {role === 'manager' && <a href="/tags" className="text-primary text-decoration-underline">Manage Tags</a>}
      </div>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<div className="p-5 text-center">Unauthorized</div>} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <FeedbackDashboard />
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <AnalyticsCharts />
            </ProtectedRoute>
          } />
          <Route path="/tags" element={
            <ProtectedRoute requiredRole="manager">
              <TagManager />
            </ProtectedRoute>
          } />
          {/* More routes will be added here */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
