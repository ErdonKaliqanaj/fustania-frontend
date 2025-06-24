import React from 'react';
import ClientLayout from '../layouts/ClientLayout';
import { useTranslation } from 'react-i18next';

const ClientProfilePage = () => {
  const { t } = useTranslation();

  return (
    <ClientLayout>
      <h2 className="text-xl font-semibold mb-4">{t('client.profile.title')}</h2>
      <div className="bg-white p-6 rounded shadow">
        <p>{t('client.profile.description')}</p>
        {/* Placeholder for profile details */}
        <div className="mt-4">
          <h3 className="text-lg font-medium">{t('client.publications.title')}</h3>
          <p>{t('client.publications.description')}</p>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientProfilePage;