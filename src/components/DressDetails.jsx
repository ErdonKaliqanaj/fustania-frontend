import { useState, useEffect } from 'react';
  import { useTranslation } from 'react-i18next';
  import axios from 'axios';
  import ContactSellerForm from './ContactSellerForm';

  const DressDetails = ({ dressId }) => {
    const { t } = useTranslation();
    const [dress, setDress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchDress = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/dresses/${dressId}`);
          setDress(response.data);
          setLoading(false);
        } catch (err) {
          setError(t('error'));
          setLoading(false);
        }
      };
      fetchDress();
    }, [dressId, t]);

    if (loading) return <div className="text-center text-gray-600">{t('loading')}</div>;
    if (error) return <div className="text-center text-red-600">{error}</div>;
    if (!dress) return null;

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">{dress.description}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
           {dress.photos && dress.photos.length > 0 ? (
  <img
    src={dress.photos[0]}
    alt={dress.description} 
    className="w-full h-64 object-cover rounded-md mb-4"
  />
) : (
  <img
    src="https://via.placeholder.com/150"
    alt={t('dressDetails.noImageAvailable')} 
    className="w-full h-64 object-cover rounded-md mb-4"
  />
)}
{dress.photos && dress.photos.length > 1 && (
  <div className="flex space-x-2">
    {dress.photos.slice(1).map((photo, index) => (
      <img
        key={index}
        src={photo}
        alt={`${dress.description} ${index + 2}`} 
        className="w-20 h-20 object-cover rounded-md"
      />
    ))}
  </div>
            )}
          </div>
          <div>
            <p className="text-gray-600 mb-2">{t('profilePage.price')}: €{dress.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-2">{t('profilePage.size')}: {dress.size}</p>
            <p className="text-gray-600 mb-2">{t('profilePage.color')}: {dress.color}</p>
            <p className="text-gray-600 mb-2">{t('profilePage.designer')}: {dress.designer}</p>
            <p className="text-gray-600 mb-4">{t('profilePage.location')}: {dress.qyteti}, {dress.shteti}</p>
            <h2 className="text-xl font-semibold mb-2">{t('dressDetails.sellerInfo')}</h2>
            <p className="text-gray-600 mb-2">{dress.sellerName}</p>
            <p className="text-gray-600 mb-4">{dress.sellerEmail}</p>
            <ContactSellerForm dressId={dressId} sellerId={dress.sellerId} />
          </div>
        </div>
      </div>
    );
  };

  export default DressDetails;