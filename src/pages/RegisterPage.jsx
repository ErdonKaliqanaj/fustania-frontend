import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import RegisterForm from '../components/RegisterForm';
import LanguageSwitcher from '../components/LanguageSwitcher';

const RegisterPage = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState(null);

  const handleSubmit = async (data, reset) => {
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
      reset();
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data || t('register.error') });
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <RegisterForm onSubmit={handleSubmit} status={status} />
      <LanguageSwitcher />
    </div>
  );
};

export default RegisterPage;