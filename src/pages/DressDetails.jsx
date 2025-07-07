import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function DressDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [dress, setDress] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({
    senderEmail: '',
    content: '',
    offerPrice: ''
  });
  const [messageStatus, setMessageStatus] = useState(null);

  useEffect(() => {
    const fetchDress = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/dresses/${id}`);
        setDress(response.data);
      } catch (err) {
        setError(t('errorFetchingDress'));
      }
    };
    fetchDress();
  }, [id, t]);

  const handleInputChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const messageDTO = {
        senderEmail: message.senderEmail,
        content: message.content,
        offerPrice: message.offerPrice ? parseFloat(message.offerPrice) : null,
        dressId: parseInt(id),
        sellerId: dress?.sellerId
      };
      await axios.post(`http://localhost:8080/api/dresses/${id}/contact`, messageDTO);
      setMessageStatus(t('messageSentSuccess'));
      setMessage({ senderEmail: '', content: '', offerPrice: '' });
    } catch (err) {
      setMessageStatus(t('messageSentError'));
    }
  };

  if (error) {
    return <div className="text-center text-red-600 p-8">{error}</div>;
  }

  if (!dress) {
    return <div className="text-center p-8">{t('loading')}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{dress.name}</h1>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <img
          src={dress.photoUrl}
          alt={dress.name}
          className="w-full h-96 object-cover rounded-md mb-4"
        />
        <p className="text-lg font-bold">{t('price')}: {dress.price} €</p>
        <p>{t('description')}: {dress.description}</p>
        <p>{t('category')}: {dress.category}</p>
        <p>{t('size')}: {dress.size}</p>
        <p>{t('color')}: {dress.color}</p>
        <p>{t('city')}: {dress.city}</p>
        <p>{t('country')}: {dress.countryName}</p>
        <h2 className="text-xl font-semibold mt-4">{t('sellerInformation')}</h2>
        <p>{t('seller')}: {dress.sellerName}</p>
        <p>{t('email')}: {dress.sellerEmail}</p>
        <p>{t('address')}: {dress.sellerAddress}</p>
        <h2 className="text-xl font-semibold mt-6">{t('contactSeller')}</h2>
        <div className="mt-4">
          {messageStatus && (
            <p className={`text-center ${messageStatus.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {messageStatus}
            </p>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('yourEmail')}</label>
              <input
                type="email"
                name="senderEmail"
                value={message.senderEmail}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder={t('yourEmail')}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('message')}</label>
              <textarea
                name="content"
                value={message.content}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder={t('message')}
                rows="4"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('offerPrice')}</label>
              <input
                type="number"
                name="offerPrice"
                value={message.offerPrice}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder={t('offerPrice')}
                min="0"
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              {t('sendMessage')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DressDetails;