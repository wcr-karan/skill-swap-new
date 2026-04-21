import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Communities from './pages/Communities';
import Connect from './pages/Connect';
import About from './pages/About';
import Matches from './pages/Matches';
import Requests from './pages/Requests';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Messages from './pages/Messages';
import AIMatches from './pages/AIMatches';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Redirect Root to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<DashboardLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/about" element={<About />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/chat/:swapId" element={<Chat />} />
            <Route path="/ai-matches" element={<AIMatches />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
