import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [dresses, setDresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:8080/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const dressesResponse = await axios.get('http://localhost:8080/api/dresses');
        setUsers(usersResponse.data);
        setDresses(dressesResponse.data);
        setLoading(false);
      } catch (err) {
        setError(t('error'));
        setLoading(false);
      }
    };
    fetchData();
  }, [token, t]);

  if (loading) return <div className="text-center text-gray-600">{t('loading')}</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t('admin.dashboard')}</h1>
      <h2 className="text-2xl font-semibold mb-4">{t('admin.users')}</h2>
      <div className="grid grid-cols-1 gap-4 mb-8">
        {users.map(user => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow">
            <p>{t('register.name')}: {user.firstName} {user.lastName}</p>
            <p>{t('register.email')}: {user.email}</p>
            <p>{t('register.role')}: {user.role}</p>
            <p>{t('register.country')}: {user.shteti}</p>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-semibold mb-4">{t('admin.dresses')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dresses.map(dress => (
          <div key={dress.id} className="bg-white p-4 rounded-lg shadow">
            <img
              src={dress.photos?.[0] || 'https://via.placeholder.com/150'}
              alt={dress.description}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p>{t('profilePage.description')}: {dress.description}</p>
            <p>{t('profilePage.price')}: €{dress.price.toFixed(2)}</p>
            <p>{t('profilePage.size')}: {dress.size}</p>
            <p>{t('profilePage.color')}: {dress.color}</p>
            <p>{t('profilePage.designer')}: {dress.designer}</p>
            <p>{t('profilePage.location')}: {dress.qyteti}, {dress.shteti}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;