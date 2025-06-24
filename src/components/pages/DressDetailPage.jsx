import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import LanguageSwitcher from '../common/LanguageSwitcher';

const DressDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [dress, setDress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState({
    senderName: '',
    senderEmail: '',
    content: ''
  });
  const [messageStatus, setMessageStatus] = useState('');

  useEffect(() => {
    const fetchDress = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/dresses/${id}`);
        if (!response.ok) {
          throw new Error(t('dressDetail.error'));
        }
        const data = await response.json();
        setDress(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchDress();
  }, [id, t]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessage({ ...message, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...message,
          dressId: id,
          sellerId: dress?.sellerId
        })
      });
      if (!response.ok) {
        throw new Error(t('dressDetail.messageError'));
      }
      setMessageStatus(t('dressDetail.messageSuccess'));
      setMessage({ senderName: '', senderEmail: '', content: '' });
    } catch (err) {
      setMessageStatus(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t('app.title')}</h1>
          <LanguageSwitcher />
        </div>
      </header>
      <main className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">{t('dressDetail.title')}</h2>
        {loading ? (
          <p>{t('dressDetail.loading')}</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : !dress ? (
          <p>{t('dressDetail.notFound')}</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto">
            <img
              src={dress.imageUrl}
              alt={dress.name}
              className="w-full h-64 object-cover rounded-md mb-4"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150')} // Fallback image
            />
            <h3 className="text-2xl font-medium mb-2">{dress.name}</h3>
            <p className="text-lg">{t('dressDetail.price')}: €{dress.price}</p>
            <p>{t('dressDetail.size')}: {dress.size}</p>
            <p>{t('dressDetail.color')}: {dress.color}</p>
            <p>{t('dressDetail.designer')}: {dress.designer || t('dressDetail.unknown')}</p>
            <p>{t('dressDetail.description')}: {dress.description || t('dressDetail.noDescription')}</p>
            <p>{t('dressDetail.sellerId')}: {dress.sellerId}</p>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">{t('dressDetail.contactSeller')}</h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="senderName" className="block text-sm font-medium">
                    {t('dressDetail.senderName')}
                  </label>
                  <input
                    type="text"
                    id="senderName"
                    name="senderName"
                    value={message.senderName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="senderEmail" className="block text-sm font-medium">
                    {t('dressDetail.senderEmail')}
                  </label>
                  <input
                    type="email"
                    id="senderEmail"
                    name="senderEmail"
                    value={message.senderEmail}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium">
                    {t('dressDetail.messageContent')}
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={message.content}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {t('dressDetail.sendMessage')}
                </button>
              </form>
              {messageStatus && (
                <p className={`mt-4 ${messageStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                  {messageStatus}
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DressDetailPage;