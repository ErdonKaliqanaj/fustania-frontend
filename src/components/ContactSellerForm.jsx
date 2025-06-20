import { useState } from 'react';
  import { useForm } from 'react-hook-form';
  import { useTranslation } from 'react-i18next';
  import axios from 'axios';

  const ContactSellerForm = ({ dressId, sellerId }) => {
    const { t } = useTranslation();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [status, setStatus] = useState(null);

    const onSubmit = async (data) => {
      try {
        await axios.post('http://localhost:8080/api/messages', {
          content: data.content,
          offerPrice: data.offerPrice || null,
          senderName: data.senderName,
          senderEmail: data.senderEmail,
          dressId,
          sellerId
        });
        setStatus({ type: 'success', message: t('contactSeller.success') });
        reset();
      } catch (error) {
        setStatus({ type: 'error', message: error.response?.data?.message || t('contactSeller.error') });
      }
    };

    return (
      <div className="bg-gray-100 p-6 rounded-lg mt-6">
        <h2 className="text-xl font-semibold mb-4">{t('contactSeller.title')}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('contactSeller.senderName')}</label>
            <input
              type="text"
              {...register('senderName', { required: t('contactSeller.senderNameRequired') })}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.senderName && <span className="text-red-600 text-sm">{errors.senderName.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('contactSeller.senderEmail')}</label>
            <input
              type="email"
              {...register('senderEmail', {
                required: t('contactSeller.senderEmailRequired'),
                pattern: { value: /^\S+@\S+$/i, message: t('contactSeller.senderEmailInvalid') }
              })}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.senderEmail && <span className="text-red-600 text-sm">{errors.senderEmail.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('contactSeller.content')}</label>
            <textarea
              {...register('content', { required: t('contactSeller.contentRequired') })}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows="4"
            />
            {errors.content && <span className="text-red-600 text-sm">{errors.content.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('contactSeller.offerPrice')}</label>
            <input
              type="number"
              step="0.01"
              {...register('offerPrice', {
                validate: value => !value || value > 0 || t('contactSeller.offerPriceInvalid')
              })}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.offerPrice && <span className="text-red-600 text-sm">{errors.offerPrice.message}</span>}
          </div>
          {status && (
            <div className={`text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {status.message}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {t('contactSeller.submit')}
          </button>
        </form>
      </div>
    );
  };

  export default ContactSellerForm;