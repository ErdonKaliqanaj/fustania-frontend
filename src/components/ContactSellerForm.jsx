// src/components/ContactSellerForm.jsx
import { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const ContactSellerForm = ({ dressId, sellerId }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    offerAmount: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/contact', {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        offerAmount: formData.offerAmount ? parseFloat(formData.offerAmount) : null,
        dressId,
        sellerId,
      });
      setSubmitStatus(t('messageSent'));
      setFormData({ name: '', email: '', message: '', offerAmount: '' });
    } catch (error) {
      setSubmitStatus(t('errorSendingMessage'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">{t('name')}</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
          placeholder={t('enterName')}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">{t('email')}</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
          placeholder={t('enterEmail')}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">{t('message')}</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
          rows="4"
          placeholder={t('enterMessage')}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">{t('offerAmount')}</label>
        <input
          name="offerAmount"
          type="number"
          value={formData.offerAmount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder={t('enterOfferAmount')}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {t('send')}
      </button>
      {submitStatus && (
        <p
          className={`mt-2 ${
            submitStatus.includes('error') ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {submitStatus}
        </p>
      )}
    </form>
  );
};

export default ContactSellerForm;