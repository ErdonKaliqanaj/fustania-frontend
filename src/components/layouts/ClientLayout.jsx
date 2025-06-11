import {Outlet, Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';

function ClientLayout(){
   const {t} = useTranslation();
   const isLonggedIn = !!localStorage.getItem('token'); //AuthCheck
  
   return(
    <div className='font-sans'>
        <header className='bg-gray-400 p-4'>
            <nav className='flex items-center justify-between max-w-6xl mx-auto'>
                <div className='flex gap-4'>
                  <Link to="/" className='text-gray-800 hover:text-gray-600'>{t('home')}
                  </Link>
                  <Link to="/dresses" className='text-gray-800 hover:text-gray-600'>{t('dresses')}
                  </Link>
                  <Link to="/register" className='text-gray-800 hover:text-gray-600'>{t('register')}
                  </Link>
                  {isLonggedIn && (<Link to="/profile" className='text-gray-800 hover:text-gray-600'>{t('profile')}
                  </Link>
                )}
                </div>
<LanguageSwitcher/>
            </nav>
        </header>
    <main className='p-6 max-w-6xl mx-auto'>
        <Outlet/>
    </main>
    </div>
   )
}
export default ClientLayout;