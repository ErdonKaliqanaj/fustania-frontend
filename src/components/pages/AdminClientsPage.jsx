import React from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { useTranslation } from 'react-i18next';

const AdminClientsPage = () => {
  const { t } = useTranslation();

  return (
    <AdminLayout>
      <h2 className="text-xl font-semibold mb-4">{t('admin.clients.title')}</h2>
      <div className="bg-white p-6 rounded shadow">
        <p>{t('admin.clients.description')}</p>
        {/* Placeholder for clients list */}
      </div>
    </AdminLayout>
  );
};

export default AdminClientsPage;