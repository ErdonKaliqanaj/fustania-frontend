import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AddDressForm = ({ onSuccess }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [status, setStatus] = useState(null);
  const {token} = useAuth();

  const onSubmit = async (data) => {
    if(!token){
        setStatus({type:'error', message: t('auth.unauthorized')});
        return;
    }
    try {
      const formData = new FormData();
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('size', data.size);
      formData.append('color', data.color);
      formData.append('qyteti', data.qyteti);
      formData.append('shteti', data.shteti);
      formData.append('designer', data.designer);
      if (data.photos[0]) {
        for (let i = 0; i < data.photos.length; i++) {
          formData.append('photos', data.photos[i]);
        }
      }

      const response = await axios.post('http://localhost:8080/api/dresses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setStatus({ type: 'success', message: t('profilePage.addSuccess') });
      reset();
      onSuccess(response.data);
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data || t('profilePage.addError') });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
      <h2 className="text-xl font-semibold mb-4">{t('profilePage.addDress')}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('profilePage.description')}</label>
          <textarea
            {...register('description', { required: t('profilePage.descriptionRequired') })}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('profilePage.description')}
            rows="4"
          />
          {errors.description && <span className="text-red-600 text-sm">{errors.description.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('profilePage.price')}</label>
          <input
            type="number"
            step="0.01"
            {...register('price', { required: t('profilePage.priceRequired'), min: { value: 0, message: t('profilePage.priceRequired') } })}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('profilePage.price')}
          />
          {errors.price && <span className="text-red-600 text-sm">{errors.price.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('profilePage.size')}</label>
          <input
            type="text"
            {...register('size', { required: t('profilePage.sizeRequired') })}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('profilePage.size')}
          />
          {errors.size && <span className="text-red-600 text-sm">{errors.size.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('profilePage.color')}</label>
          <input
            type="text"
            {...register('color', { required: t('profilePage.colorRequired') })}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('profilePage.color')}
          />
          {errors.color && <span className="text-red-600 text-sm">{errors.color.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('profilePage.designer')}</label>
          <input
            type="text"
            {...register('designer', { required: t('profilePage.designerRequired') })}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('profilePage.designer')}
          />
          {errors.designer && <span className="text-red-600 text-sm">{errors.designer.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('profilePage.location')}</label>
          <input
            type="text"
            {...register('qyteti', { required: t('profilePage.cityRequired') })}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Qyteti"
          />
          {errors.qyteti && <span className="text-red-600 text-sm">{errors.qyteti.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('profilePage.country')}</label>
          <select
            {...register('shteti', { required: t('profilePage.countryRequired') })}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('register.kosovo')}</option>
            <option value="KOSOVE">{t('register.kosovo')}</option>
             <option value="ALBANIA">{t('register.albania')}</option>
              <option value="MACEDONIA">{t('register.macedonia')}</option>
            
          </select>
          {errors.shteti && <span className="text-red-600 text-sm">{errors.shteti.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('profilePage.photos')}</label>
          <input
            type="file"
            multiple
            accept="image/*"
            {...register('photos', { required: t('profilePage.photosRequired') })}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.photos && <span className="text-red-600 text-sm">{errors.photos.message}</span>}
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
          {t('profilePage.addDress')}
        </button>
      </form>
    </div>
  );
};

export default AddDressForm;