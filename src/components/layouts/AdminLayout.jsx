import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminLayout = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-200">
      <nav className="bg-green-500 p-4 text-white">
        <ul className="flex space-x-4">
          <li>
            <Link to="/admin/clients" className="hover:underline">
              {t('clients')}
            </Link>
          </li>
          <li>
            <Link to="/admin/lists" className="hover:underline">
              {t('lists')}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="container mx-auto p-4">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;