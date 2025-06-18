import { Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import ClientLayout from './layouts/ClientLayout';
import AdminLayout from './layouts/AdminLayout';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import DressDetailsPage from './pages/DressDetailsPage';
import DressesPage from './pages/DressesPage';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route path="/" element={<DressesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dresses" element={<DressesPage />} />
          <Route path="/dresses/:id" element={<DressDetailsPage />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminDashboard />} />
          <Route path="/admin/dresses" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </I18nextProvider>
  );
};

export default App;
