import React from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { useTranslation } from 'react-i18next';

const AdminPublicationsPage = () => {
  const { t } = useTranslation();

  return (
    <AdminLayout>
      <h2 className="text-xl font-semibold mb-4">{t('admin.publications.title')}</h2>
      <div className="bg-white p-6 rounded shadow">
        <p>{t('admin.publications.description')}</p>
        {/* Placeholder for publications list */}
      </div>
    </AdminLayout>
  );
};

export default AdminPublicationsPage;