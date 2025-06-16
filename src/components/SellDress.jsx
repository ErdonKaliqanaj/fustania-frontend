import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const SellDress = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simulim i autentikimit
  const [userRole, setUserRole] = useState(''); // Simulim i rolit
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    size: '',
    color: '',
    description: ''
  });

  
  const handleLoginSimulation = () => {
   
    const role = prompt(t('enterRolePrompt'));
    if (role === 'SELLER') {
      setIsAuthenticated(true);
      setUserRole('SELLER');
    } else if (role === 'BUYER') {
      setIsAuthenticated(true);
      setUserRole('BUYER');
    } else {
      alert(t('invalidRole'));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAuthenticated && userRole === 'SELLER') {
      alert(t('dressAdded') + `: ${formData.name}, $${formData.price}`);
      setFormData({ name: '', price: '', size: '', color: '', description: '' });
    } else {
      alert(t('mustBeSeller'));
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">{t('sellDress')}</h2>
      {!isAuthenticated ? (
        <div>
          <p>{t('mustLoginToSell')}</p>
          <button onClick={handleLoginSimulation} className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            {t('simulateLogin')}
          </button>
        </div>
      ) : userRole === 'SELLER' ? (
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700">{t('dressName')}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{t('price')}</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{t('size')}</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{t('color')}</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{t('description')}</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            {t('addDress')}
          </button>
        </form>
      ) : (
        <div>
          <p>{t('mustBeSeller')}</p>
          <button onClick={() => navigate('/register')} className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            {t('registerAsSeller')}
          </button>
        </div>
      )}
    </div>
  );
};

export default SellDress;