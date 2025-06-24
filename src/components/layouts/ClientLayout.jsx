import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../common/LanguageSwitcher';

const ClientLayout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t('app.title')}</h1>
          <div className="flex items-center space-x-4">
            <nav>
              <Link to="/client/profile" className="mr-4 hover:underline">
                {t('nav.profile')}
              </Link>
              <Link to="/client/publications" className="hover:underline">
                {t('nav.publications')}
              </Link>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
};

export default ClientLayout;