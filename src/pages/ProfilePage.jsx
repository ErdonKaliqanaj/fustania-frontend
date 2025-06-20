import { useState, useEffect } from 'react';
  import { useTranslation } from 'react-i18next';
  import { Routes, Route, Link, useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import AddDressForm from '../components/AddDressForm';
  import { useAuth } from '../context/AuthContext';

  const ProfilePage = () => {
    const { t } = useTranslation();
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [dresses, setDresses] = useState([]);
    const [messages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (!user) {
        navigate('/login');
        return;
      }

      const fetchData = async () => {
        try {
          if (user.role === 'SELLER') {
            const dressesResponse = await axios.get('http://localhost:8080/api/dresses/my-dresses', {
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
    }, [user, token, navigate, t]);

    const handleAddDressSuccess = (newDress) => {
      setDresses([...dresses, newDress]);
    };

    const handleDeleteDress = async (id) => {
      try {
        await axios.delete(`http://localhost:8080/api/dresses/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDresses(dresses.filter(dress => dress.id !== id));
      } catch (err) {
        setError(t('profilePage.deleteError'));
      }
    };

    if (loading) return <div className="text-center text-gray-600">{t('loading')}</div>;
    if (error) return <div className="text-center text-red-600">{error}</div>;

    return (
      <div>
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('profilePage.title')}</h1>
        <nav className="mb-6">
          <ul className="flex space-x-4">
            <li><Link to="/profile/dresses" className="text-blue-600 hover:underline">{t('profilePage.dresses')}</Link></li>
            <li><Link to="/profile/messages" className="text-blue-600 hover:underline">{t('profilePage.messages')}</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/dresses"
            element={
              <>
                {user.role === 'SELLER' && <AddDressForm onSuccess={handleAddDressSuccess} />}
                <h2 className="text-2xl font-semibold mt-6 mb-4">{t('profilePage.dresses')}</h2>
                {dresses.length === 0 ? (
                  <p className="text-gray-600">{t('profilePage.noDresses')}</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dresses.map(dress => (
                      <div key={dress.id} className="bg-white p-4 rounded-lg shadow">
                        <img
                          src={dress.photos?.[0] || 'https://via.placeholder.com/150'}
                          alt={dress.description}
                          className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-lg font-semibold">{dress.description}</h3>
                        <p className="text-gray-600">{t('profilePage.price')}: €{dress.price.toFixed(2)}</p>
                        <p className="text-gray-600">{t('profilePage.size')}: {dress.size}</p>
                        <p className="text-gray-600">{t('profilePage.color')}: {dress.color}</p>
                        <p className="text-gray-600">{t('profilePage.designer')}: {dress.designer}</p>
                        <p className="text-gray-600">{t('profilePage.location')}: {dress.qyteti}, {dress.shteti}</p>
                        <div className="mt-2 flex space-x-2">
                          <button
                            onClick={() => handleDeleteDress(dress.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            {t('profilePage.delete')}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            }
          />
          <Route
            path="/messages"
            element={
              <>
                <h2 className="text-2xl font-semibold mb-4">{t('profilePage.messages')}</h2>
                {messages.length === 0 ? (
                  <p className="text-gray-600">{t('profilePage.noMessages')}</p>
                ) : (
                  <div className="space-y-4">
                    {messages.map(message => (
                      <div key={message.id} className="bg-white p-4 rounded-lg shadow">
                        <p className="text-gray-600">{message.content}</p>
                        <p className="text-gray-600">{t('contactSeller.offerPrice')}: {message.offerPrice ? `€${message.offerPrice.toFixed(2)}` : '-'}</p>
                        <p className="text-gray-600">{t('contactSeller.senderName')}: {message.senderName}</p>
                        <p className="text-gray-600">{t('contactSeller.senderEmail')}: {message.senderEmail}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            }
          />
        </Routes>
      </div>
    );
  };

  export default ProfilePage;