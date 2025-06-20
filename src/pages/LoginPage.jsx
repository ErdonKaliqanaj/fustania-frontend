import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [status, setStatus] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email: data.email,
        password: data.password
      });
      login({ email: data.email }, response.data.token);
      setStatus({ type: 'success', message: t('login.success') });
      navigate('/profile');
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || t('login.error') });
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('login.submit')}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          {status && (
            <div className={`text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {status.message}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {t('login.submit')}
          </button>
        </form>
      </div>
      <LanguageSwitcher />
    </div>
  );
};

export default LoginPage;