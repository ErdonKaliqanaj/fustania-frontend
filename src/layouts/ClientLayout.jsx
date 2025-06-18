import {Outlet, Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguagSwitcher from '../components/LanguageSwitcher';

const ClientLayout = () => {
    const {t} = useTranslation();

     const user = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com'
  };

    return(
        <div className='flex flex-col min-h-screen'>
            <nav className='bg-blue-600 text-white p-4'>
                <div className='container mx-auto flex justofy-between items-center'>
                    <Link to="/" className='text-xl font-bold'>
                    Fustania
                    </Link>
                    <ul className='flex space-x-6'>
                        <li>
                            <Link to="/" className='hover:underline'>
                            {t('header.home')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className="hover:underline">
                            {t('header.profile')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/dresses" className='hover:underline'>
                              {t('header.dresses')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/logout" className='hover:underline'>
                            {t('header.logout')}
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className='flex flex-1'>
                <aside className='w-64 bg-gray-100 p-4'>
                    <h2 className='text-xl font-semibold mb-4'>
                        {t('sidebar.userInfo')}
                    </h2>
                    <p className='text-gray-700'>{user.firstName}{user.lastName}</p>
                    <p className='text-gray-700'>{user.email}</p>
                    <h2 className='text-xl font-semibold mt-6 mb-4'>
                        {t('sidebar.myDresses')}
                    </h2>
                    <ul className='space-y-2'>
                        <li>
                            <Link to="/profile">
                            {t('sidebar.myDresses')}
                            </Link>
                        </li>
                    </ul>
                </aside>

                <main className='flex-1 p-6 bg-gray-50'>
                    <Outlet/>
                </main>
            </div>
            <footer className='p-4 bg-gray-200 text-center text-gray-600'>
                {t('footer.copyright')}
            </footer>
            <LanguagSwitcher/>

        </div>
    )
}
export default ClientLayout;