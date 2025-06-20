import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [dresses, setDresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location.pathname === '/admin/users' || location.pathname === '/admin/dashboard') {
          const usersResponse = await axios.get('http://localhost:8080/api/users', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUsers(usersResponse.data);
        }
        if (location.pathname === '/admin/dresses' || location.pathname === '/admin/dashboard') {
          const dressesResponse = await axios.get('http://localhost:8080/api/dresses', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setDresses(dressesResponse.data);
        }
        setLoading(false);
      } catch (err) {
        setError(t('error'));
        setLoading(false);
      }
    };
    fetchData();
  }, [location.pathname, token, t]);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError(t('error'));
    }
  };

  const handleDeleteDress = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/dresses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDresses(dresses.filter(dress => dress.id !== id));
    } catch (err) {
      setError(t('error'));
    }
  };

  if (loading) return <div className="text-center text-gray-600">{t('loading')}</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('adminDashboard.title')}</h1>

      {(location.pathname === '/admin/users' || location.pathname === '/admin/dashboard') && (
        <>
          <h2 className="text-2xl font-semibold mb-4">{t('adminDashboard.users')}</h2>
          {users.length === 0 ? (
            <p className="text-gray-600">{t('adminDashboard.noUsers')}</p>
          ) : (
            <div className="mb-6 overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow rounded-lg">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-left">{t('adminDashboard.name')}</th>
                    <th className="p-2 text-left">{t('adminDashboard.email')}</th>
                    <th className="p-2 text-left">{t('adminDashboard.role')}</th>
                    <th className="p-2 text-left">{t('adminDashboard.country')}</th>
                    <th className="p-2 text-left">{t('adminDashboard.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b">
                      <td className="p-2">{user.firstName} {user.lastName}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">{user.role}</td>
                      <td className="p-2">{user.shteti}</td>
                      <td className="p-2">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          {t('profilePage.delete')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {(location.pathname === '/admin/dresses' || location.pathname === '/admin/dashboard') && (
        <>
          <h2 className="text-2xl font-semibold mb-4">{t('adminDashboard.allDresses')}</h2>
          {dresses.length === 0 ? (
            <p className="text-gray-600">{t('adminDashboard.noDresses')}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dresses.map(dress => (
                <div key={dress.id} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold">{dress.description}</h3>
                  <p className="text-gray-600">{t('profilePage.price')}: €{dress.price.toFixed(2)}</p>
                  <p className="text-gray-600">{t('profilePage.size')}: {dress.size}</p>
                  <p className="text-gray-600">{t('profilePage.color')}: {dress.color}</p>
                  <p className="text-gray-600">{t('profilePage.designer')}: {dress.designer}</p>
                  <p className="text-gray-600">{t('profilePage.location')}: {dress.qyteti}, {dress.shteti}</p>
                  <button
                    onClick={() => handleDeleteDress(dress.id)}
                    className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    {t('profilePage.delete')}
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;