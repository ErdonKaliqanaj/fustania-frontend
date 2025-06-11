import { Outlet, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";

function AdminLayout(){
    const{t} = useTranslation();
    const isAdmin = localStorage.getItem('role') === 'SUPER_ADMIN';
    
    if(!isAdmin){
        return <div className="p-6 text-red-600">{t('access_denied')}</div>
    }

    return(
        <div className="bg-gray-800 p-4">
            <header className="bg-gray-800 p-4">
            <nav className="flex items-center justify-between max-w-6xl mx-auto">
                <div className="flex ga[-4">
                    <Link to="/admin/users" className="text-white hover:text-gray-300">{t('users')}
                    </Link>
                    <Link to="/admin/dresses" className="text-white hover:text-gray-300">{t('dresses')}
                    </Link>
                    <Link to="/" className="text-white hover:text-gray-300">{t('logut')}
                    </Link>
                </div>
                <LanguageSwitcher/>
            </nav>
            </header>
            <main className="p-6 max-w-6xl mx-auto">
         <Outlet/>
            </main>
        </div>
    )

}

export default AdminLayout;