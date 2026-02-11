import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Matches from './pages/Matches';
import Requests from './pages/Requests';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        <Route element={<DashboardLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
