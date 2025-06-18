import { Outlet, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from '../components/LanguageSwitcher';

const AdminLayout = () => {
    const {t} = useTranslation();

    return(
        <div className="flex felx-col min-h-screen">
          <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/admin/dashboard" className="text-xl font-bold">
                  Fustania Admin
                </Link>
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/admin/dashboard" className="hover:underline">
                        {t('adminHeader.dashboard')}
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/users" className="hover:underline">
                        {t('adminHeader.users')}
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/dresses" className="hover:underline">
                        {t('adminHeader.dresses')}
                        </Link>
                    </li>
                    <li>
                        <Link to="/logout" className="hover:underline">
                        {t('adminHeader.logout')}
                        </Link>
                    </li>
                </ul>
            </div>
          </nav>

          <div className="flex flex-1">
        
        <aside className="w-64 bg-gray-100 p-4">
          <h2 className="text-xl font-semibold mb-4">{t('adminSidebar.adminTools')}</h2>
          <ul className="space-y-2">
            <li><Link to="/admin/users" className="text-blue-600 hover:underline">{t('adminSidebar.manageUsers')}</Link></li>
            <li><Link to="/admin/dresses" className="text-blue-600 hover:underline">{t('adminSidebar.manageDresses')}</Link></li>
          </ul>
        </aside>

        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>

 <footer className="p-4 bg-gray-200 text-center text-gray-600">
        {t('footer.copyright')}
      </footer>

      <LanguageSwitcher/>
        </div>
    )
}
export default AdminLayout;