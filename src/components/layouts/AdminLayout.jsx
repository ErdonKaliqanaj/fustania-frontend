import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HomeIcon, UserIcon, ListBulletIcon } from '@heroicons/react/24/solid';
import LanguageSwitcher from '../common/LanguageSwitcher';

const AdminLayout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">{t('app.title')} Admin</h2>
        <nav>
          <Link to="/admin/clients" className="flex items-center mb-2 hover:bg-blue-700 p-2 rounded">
            <UserIcon className="w-5 h-5 mr-2" /> {t('nav.clients')}
          </Link>
          <Link to="/admin/publications" className="flex items-center mb-2 hover:bg-blue-700 p-2 rounded">
            <ListBulletIcon className="w-5 h-5 mr-2" /> {t('nav.allPublications')}
          </Link>
        </nav>
        <div className="mt-4">
          <LanguageSwitcher />
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default AdminLayout;