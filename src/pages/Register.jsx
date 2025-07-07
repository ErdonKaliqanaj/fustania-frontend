import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function Register() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    countryName: '',
    role: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/countries');
        setCountries(response.data.map(country => country.name));
      } catch (err) {
        setErrors({ general: t('errorFetchingData') });
      }
    };
    fetchCountries();
  }, [t]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = t('firstNameRequired');
    } else if (!formData.firstName.match(/^[a-zA-Z]+$/)) {
      newErrors.firstName = t('firstNameInvalid');
    }
    if (!formData.lastName) {
      newErrors.lastName = t('lastNameRequired');
    } else if (!formData.lastName.match(/^[a-zA-Z]+$/)) {
      newErrors.lastName = t('lastNameInvalid');
    }
    if (!formData.email) {
      newErrors.email = t('emailRequired');
    } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = t('emailInvalid');
    }
    if (!formData.password) {
      newErrors.password = t('passwordRequired');
    } else if (!formData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) {
      newErrors.password = t('passwordInvalid');
    }
    if (!formData.countryName) {
      newErrors.countryName = t('countryRequired');
    }
    if (!formData.role) {
      newErrors.role = t('roleRequired');
    }
    if (!formData.address) {
      newErrors.address = t('addressRequired');
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/users/register', formData);
      setSuccessMessage(response.data);
      setErrors({});
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        countryName: '',
        role: '',
        address: ''
      });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setErrors({ general: err.response.data.error });
      } else {
        setErrors({ general: t('registrationFailed') });
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '', general: '' });
    setSuccessMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">{t('register')}</h1>
        {successMessage && (
          <p className="text-green-600 text-center mb-4">{successMessage}</p>
        )}
        {errors.general && (
          <p className="text-red-600 text-center mb-4">{errors.general}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('firstName')}</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('lastName')}</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('email')}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('password')}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('country')}</label>
            <select
              name="countryName"
              value={formData.countryName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="">{t('selectCountry')}</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {errors.countryName && <p className="text-red-600 text-sm">{errors.countryName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('role')}</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="">{t('selectRole')}</option>
              <option value="BUYER">{t('buyer')}</option>
              <option value="SELLER">{t('seller')}</option>
            </select>
            {errors.role && <p className="text-red-600 text-sm">{errors.role}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('address')}</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            {t('register')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;