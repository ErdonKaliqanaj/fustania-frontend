import { useTranslation } from 'react-i18next';
import { Outlet, Link } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';

function AdminLayout() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t('adminDashboard')}</h1>
          <nav className="flex items-center space-x-4">
            <Link to="/admin/clients" className="hover:underline">{t('registeredClients')}</Link>
            <Link to="/admin/listings" className="hover:underline">{t('allListings')}</Link>
            <LanguageSwitcher />
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 Fustania. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AdminLayout;