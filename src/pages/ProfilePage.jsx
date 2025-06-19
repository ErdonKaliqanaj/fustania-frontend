import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import AddDressForm from '../components/AddDressForm';
import MessagesList from '../components/MessagesList';

const ProfilePage = () => {
  const { t } = useTranslation();
  const [dresses, setDresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/dresses/my-dresses', {
          headers: { Authorization: 'Bearer YOUR_TOKEN' }
        });
        setDresses(response.data);
        setLoading(false);
      } catch (err) {
        setError(t('error'));
        setLoading(false);
      }
    };
    fetchDresses();
  }, [t]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/dresses/${id}`, {
        headers: { Authorization: 'Bearer YOUR_TOKEN' }
      });
      setDresses(dresses.filter(dress => dress.id !== id));
      setError(null);
    } catch (err) {
      setError(t('profilePage.deleteError'));
    }
  };

  const handleAddSuccess = (newDress) => {
    setDresses([...dresses, newDress]);
    setShowAddForm(false);
  };

  if (loading) return <div className="text-center text-gray-600">{t('loading')}</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('profilePage.title')}</h1>
      <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        {t('profilePage.editProfile')}
      </button>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h2 className="text-2xl font-semibold mb-4">{t('profilePage.dresses')}</h2>
              {dresses.length === 0 ? (
                <p className="text-gray-600">{t('profilePage.noDresses')}</p>
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
                      <div className="mt-2 flex space-x-2">
                        <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                          {t('profilePage.edit')}
                        </button>
                        <button
                          onClick={() => handleDelete(dress.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          {t('profilePage.delete')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {t('profilePage.addDress')}
              </button>
              {showAddForm && <AddDressForm onSuccess={handleAddSuccess} />}
            </>
          }
        />
        <Route path="messages" element={<MessagesList />} />
      </Routes>
    </div>
  );
};

export default ProfilePage;