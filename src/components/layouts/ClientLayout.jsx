import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ClientLayout = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-500 p-4 text-white">
        <ul className="flex space-x-4">
          <li>
            <Link to="/profile" className="hover:underline">
              {t('profile')}
            </Link>
          </li>
          <li>
            <Link to="/publications" className="hover:underline">
              {t('publications')}
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

export default ClientLayout;