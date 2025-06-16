
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        shteti: data.shteti,
        role: data.role,
      });
      setSubmitStatus(t('registrationSuccess'));
      console.log('User registered:', response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || t('registrationError');
      setSubmitStatus(errorMessage);
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('register')}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       
        <div>
          <label className="block text-sm font-medium">{t('firstName')}</label>
          <input
            {...register('firstName', { required: t('firstNameRequired') })}
            className="w-full p-2 border rounded"
            placeholder={t('enterFirstName')}
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        
        <div>
          <label className="block text-sm font-medium">{t('lastName')}</label>
          <input
            {...register('lastName', { required: t('lastNameRequired') })}
            className="w-full p-2 border rounded"
            placeholder={t('enterLastName')}
          />
          {errors.lastName && (
            <p className="text-red-600 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        
        <div>
          <label className="block text-sm font-medium">{t('email')}</label>
          <input
            type="email"
            {...register('email', {
              required: t('emailRequired'),
              pattern: {
                value: /^\S+@\S+$/i,
                message: t('emailInvalid'),
              },
            })}
            className="w-full p-2 border rounded"
            placeholder={t('enterEmail')}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

       
        <div>
          <label className="block text-sm font-medium">{t('password')}</label>
          <input
            type="password"
            {...register('password', {
              required: t('passwordRequired'),
              minLength: {
                value: 6,
                message: t('passwordMinLength'),
              },
            })}
            className="w-full p-2 border rounded"
            placeholder={t('enterPassword')}
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">{t('country')}</label>
          <select
            {...register('shteti', { required: t('countryRequired') })}
            className="w-full p-2 border rounded"
          >
            <option value="">{t('selectCountry')}</option>
            <option value="KOSOVE">{t('kosovo')}</option>
            <option value="SHQIPERI">{t('albania')}</option>
            <option value="MAQEDONI">{t('macedonia')}</option>
          </select>
          {errors.shteti && (
            <p className="text-red-600 text-sm">{errors.shteti.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">{t('role')}</label>
          <select
            {...register('role', { required: t('roleRequired') })}
            className="w-full p-2 border rounded"
          >
            <option value="">{t('selectRole')}</option>
            <option value="SELLER">{t('seller')}</option>
            <option value="BUYER">{t('buyer')}</option>
          </select>
          {errors.role && (
            <p className="text-red-600 text-sm">{errors.role.message}</p>
          )}
        </div>

        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {t('register')}
        </button>
      </form>

      
      {submitStatus && (
        <p
          className={`mt-4 text-center ${
            submitStatus.includes('Error') || submitStatus.includes('Gabim')
              ? 'text-red-600'
              : 'text-green-600'
          }`}
        >
          {submitStatus}
        </p>
      )}

      
      <p className="mt-4 text-center">
        {t('alreadyHaveAccount')}{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          {t('login')}
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;