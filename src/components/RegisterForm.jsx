import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

const RegisterForm = ({ onSuccess }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [status, setStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        address: data.address,
        shteti: data.shteti,
        role: data.role
      });
      setStatus({ type: 'success', message: t('register.success') });
      onSuccess(response.data);
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || t('register.error') });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('register.submit')}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('register.firstName')}</label>
          <input
            type="text"
            {...register('firstName', { required: t('register.firstNameRequired') })}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.firstName && <span className="text-red-600 text-sm">{errors.firstName.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('register.lastName')}</label>
          <input
            type="text"
            {...register('lastName', { required: t('register.lastNameRequired') })}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.lastName && <span className="text-red-600 text-sm">{errors.lastName.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('register.email')}</label>
          <input
            type="email"
            {...register('email', {
              required: t('register.emailRequired'),
              pattern: { value: /^\S+@\S+$/i, message: t('register.emailInvalid') }
            })}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('register.password')}</label>
          <input
            type="password"
            {...register('password', { required: t('register.passwordRequired') })}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('register.address')}</label>
          <input
            type="text"
            {...register('address', { required: t('register.addressRequired') })}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.address && <span className="text-red-600 text-sm">{errors.address.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('register.country')}</label>
          <select
            {...register('shteti', { required: t('register.countryRequired') })}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('register.country')}</option>
            <option value="KOSOVE">{t('register.kosovo')}</option>
             <option value="SHQIPERI">{t('register.albania')}</option> 
             <option value="MAQEDONI">{t('register.macedonia')}</option> 
          </select>
          {errors.shteti && <span className="text-red-600 text-sm">{errors.shteti.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('register.role')}</label>
          <select
            {...register('role', { required: t('register.roleRequired') })}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('register.role')}</option>
            <option value="SELLER">{t('register.seller')}</option>
            <option value="BUYER">{t('register.buyer')}</option>
          </select>
          {errors.role && <span className="text-red-600 text-sm">{errors.role.message}</span>}
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
          {t('register.submit')}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;