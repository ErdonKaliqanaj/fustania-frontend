import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useAuth } from '../context/AuthContext';

const ClientLayout = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
 



  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link to="/">{t('app.title')}</Link>
          </h1>
          <nav className="flex space-x-4 items-center">
            <Link to="/dresses" className="hover:underline">{t('nav.dresses')}</Link>
            {user ? (
              <>
                <Link to="/profile/dresses" className="hover:underline">{t('nav.profile')}</Link>
                <button onClick={logout} className="hover:underline">{t('nav.logout')}</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline">{t('nav.login')}</Link>
                <Link to="/register" className="hover:underline">{t('nav.register')}</Link>
              </>
            )}
            <LanguageSwitcher />
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;