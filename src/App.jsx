import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './components/layouts/AdminLayout';
import ClientLayout from './components/layouts/ClientLayout';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';
import Register from './components/Register';
import DressList from './components/DressList';
import DressDetail from './components/DressDetail';
import SellDress from './components/SellDress';


function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <LanguageSwitcher />
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route path="profile" element={<h2>{t('profile')}</h2>} />
          <Route path="publications" element={<h2>{t('publications')}</h2>} />
          <Route path="register" element={<Register />} />
          <Route path="dresses" element={<DressList />} />
          <Route path="dresses/:id" element={<DressDetail />} />
          <Route path="sell" element={<SellDress />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="clients" element={<h2>{t('clients')}</h2>} />
          <Route path="lists" element={<h2>{t('lists')}</h2>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
