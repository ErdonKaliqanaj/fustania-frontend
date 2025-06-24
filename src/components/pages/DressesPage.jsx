import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../common/LanguageSwitcher';

const DressesPage = () => {
  const { t } = useTranslation();
  const [dresses, setDresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    size: '',
    color: ''
  });

  useEffect(() => {
    fetchDresses();
  }, []);

  const fetchDresses = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.priceMin) queryParams.append('priceMin', filters.priceMin);
      if (filters.priceMax) queryParams.append('priceMax', filters.priceMax);
      if (filters.size) queryParams.append('size', filters.size);
      if (filters.color) queryParams.append('color', filters.color);

      const response = await fetch(`http://localhost:8080/api/dresses?${queryParams}`);
      if (!response.ok) {
        throw new Error(t('dresses.error'));
      }
      const data = await response.json();
      setDresses(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchDresses();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t('app.title')}</h1>
          <LanguageSwitcher />
        </div>
      </header>
      <main className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">{t('dresses.title')}</h2>
        <form onSubmit={handleFilterSubmit} className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="priceMin" className="block text-sm font-medium">{t('dresses.priceMin')}</label>
              <input
                type="number"
                id="priceMin"
                name="priceMin"
                value={filters.priceMin}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-md"
                placeholder={t('dresses.priceMinPlaceholder')}
              />
            </div>
            <div>
              <label htmlFor="priceMax" className="block text-sm font-medium">{t('dresses.priceMax')}</label>
              <input
                type="number"
                id="priceMax"
                name="priceMax"
                value={filters.priceMax}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-md"
                placeholder={t('dresses.priceMaxPlaceholder')}
              />
            </div>
            <div>
              <label htmlFor="size" className="block text-sm font-medium">{t('dresses.size')}</label>
              <select
                id="size"
                name="size"
                value={filters.size}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">{t('dresses.sizeAll')}</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div>
              <label htmlFor="color" className="block text-sm font-medium">{t('dresses.color')}</label>
              <select
                id="color"
                name="color"
                value={filters.color}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">{t('dresses.colorAll')}</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {t('dresses.applyFilters')}
          </button>
        </form>
        {loading ? (
          <p>{t('dresses.loading')}</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : dresses.length === 0 ? (
          <p>{t('dresses.empty')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {dresses.map((dress) => (
              <Link to={`/dresses/${dress.id}`} key={dress.id} className="bg-white p-4 rounded-lg shadow">
                <img
                  src={dress.imageUrl}
                  alt={dress.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                />
                <h3 className="text-lg font-medium">{dress.name}</h3>
                <p>{t('dresses.price')}: €{dress.price}</p>
                <p>{t('dresses.size')}: {dress.size}</p>
                <p>{t('dresses.color')}: {dress.color}</p>
                <p>{t('dresses.designer')}: {dress.designer || t('dresses.unknown')}</p>
                <p>{t('dresses.description')}: {dress.description || t('dresses.noDescription')}</p>
                <p>{t('dresses.sellerId')}: {dress.sellerId}</p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DressesPage;