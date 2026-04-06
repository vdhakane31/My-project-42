import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginSelectionPage from './pages/LoginSelectionPage';
import StudentAuthPage from './pages/StudentAuthPage';
import StudentDashboard from './pages/StudentDashboard';
import TPODashboard from './pages/TPODashboard';
import TPOLoginPage from './pages/TPOLoginPage';

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login-selection" element={<LoginSelectionPage />} />
      <Route path="/student-auth" element={<StudentAuthPage />} />
      <Route path="/tpo-login" element={<TPOLoginPage />} />
      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tpo-dashboard"
        element={
          <ProtectedRoute role="tpo">
            <TPODashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Layout>
);

export default App;
