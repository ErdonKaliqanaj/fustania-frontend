import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ContactSellerForm from '../components/ContactSellerForm';

const DressDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [dress, setDress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDress = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/dresses/${id}`);
        setDress(response.data);
        setLoading(false);
      } catch (err) {
        setError(t('dressNotFound'));
        setLoading(false);
      }
    };
    fetchDress();
  }, [id, t]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">{t('loading')}</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
        <Link to="/dresses" className="ml-4 text-blue-600 hover:underline">{t('backToHome')}</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{t('dressDetails')}</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">{t('photos')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dress.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Dress photo ${index + 1}`}
                  className="w-full h-64 object-cover rounded-md"
                />
              ))}
            </div>
          </div>

          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">{t('description')}</h2>
            <p className="text-gray-700">{dress.description}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">{t('price')}</h2>
              <p className="text-gray-700">€{dress.price.toFixed(2)}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{t('size')}</h2>
              <p className="text-gray-700">{dress.size}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{t('color')}</h2>
              <p className="text-gray-700">{dress.color}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{t('city')}</h2>
              <p className="text-gray-700">{dress.qyteti}, {dress.shteti}</p>
            </div>
          </div>

          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">{t('sellerInfo')}</h2>
            <div className="space-y-2">
              <p><strong>{t('sellerName')}:</strong> {dress.seller.firstName} {dress.seller.lastName}</p>
              <p><strong>{t('sellerEmail')}:</strong> {dress.seller.email}</p>
              <p><strong>{t('sellerAddress')}:</strong> {dress.seller.address}</p>
            </div>
          </div>

          
          <ContactSellerForm dressId={parseInt(id)} />
        </div>
        <Link to="/dresses" className="block mt-6 text-center text-blue-600 hover:underline">{t('backToHome')}</Link>
      </div>
    </div>
  );
};

export default DressDetails;