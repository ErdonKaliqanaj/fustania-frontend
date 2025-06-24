import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ClientProfilePage from './components/pages/ClientProfilePage';
import AdminClientsPage from './components/pages/AdminClientsPage';
import AdminPublicationsPage from './components/pages/AdminPublications';
import RegisterPage from './components/pages/RegisterPage';
import DressesPage from './components/pages/DressesPage';
import DressDetailPage from './components/pages/DressDetailPage';

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dresses" element={<DressesPage />} />
        <Route path="/dresses/:id" element={<DressDetailPage />} />
        <Route path="/client/profile" element={<ClientProfilePage />} />
        <Route path="/admin/clients" element={<AdminClientsPage />} />
        <Route path="/admin/publications" element={<AdminPublicationsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
