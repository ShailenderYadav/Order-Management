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
      <div className="bg-gray-100 p-4 flex gap-4 items-center">
        <a href="/dashboard" className="text-blue-600 hover:underline">Dashboard</a>
        <a href="/analytics" className="text-blue-600 hover:underline">Analytics</a>
        {role === 'manager' && <a href="/tags" className="text-blue-600 hover:underline">Manage Tags</a>}
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<div className="p-8 text-center">Unauthorized</div>} />
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
    </BrowserRouter>
  );
}

export default App;
