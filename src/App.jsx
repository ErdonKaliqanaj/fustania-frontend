import { Routes, Route } from 'react-router-dom';
import ClientLayout from './layouts/ClientLayout';
import AdminLayout from './layouts/AdminLayout';
import LoginPage from './pages/LoginPage';
import DressesPage from './pages/DressesPage';
import DressDetailsPage from './pages/DressDetailsPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dresses" element={<DressesPage />} />
        <Route path="/dresses/:id" element={<DressDetailsPage />} />

        <Route element={<ClientLayout />}>
          <Route path="/" element={<DressesPage />} />
          <Route path="/profile/*" element={<ProfilePage />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminDashboard />} />
          <Route path="/admin/dresses" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;

