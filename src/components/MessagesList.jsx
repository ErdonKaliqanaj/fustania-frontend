import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


const MessagesList = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token] = useAuth();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/messages/my-messages', {
          headers: { Authorization:  `Bearer ${token}` }
        });
        setMessages(response.data);
        setLoading(false);
      } catch (err) {
        setError(t('error'));
        setLoading(false);
      }
    };
    fetchMessages();
  }, [token, t]);

  if (loading) return <div className="text-center text-gray-600">{t('loading')}</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{t('messagesList.title')}</h2>
      {messages.length === 0 ? (
        <p className="text-gray-600">{t('profilePage.noMessages')}</p>
      ) : (
        <div className="space-y-4">
          {messages.map(message => (
            <div key={message.id} className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600"><strong>{t('messagesList.dress')}:</strong> {message.dressId}</p>
              <p className="text-gray-600"><strong>{t('messagesList.senderName')}:</strong> {message.senderName}</p>
              <p className="text-gray-600"><strong>{t('messagesList.senderEmail')}:</strong> {message.senderEmail}</p>
              <p className="text-gray-600"><strong>{t('messagesList.offerPrice')}:</strong> €{message.offerPrice?.toFixed(2) || '0.00'}</p>
              <p className="text-gray-600"><strong>{t('messagesList.content')}:</strong> {message.content}</p>
              <p className="text-gray-600"><strong>{t('messagesList.createdAt')}:</strong> {new Date(message.createAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesList;