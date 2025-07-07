import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dresses() {
  const { t } = useTranslation();
  const [dresses, setDresses] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    countryName: '',
    maxPrice: '',
    size: '',
    color: '',
    city: '',
    sellerId: '',
  });
  const [countries, setCountries] = useState(['Kosovo']);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/countries');
        setCountries(response.data.map(country => country.name));
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const params = {};
        if (filters.category) params.category = filters.category;
        if (filters.countryName) params.countryName = filters.countryName;
        if (filters.maxPrice) params.maxPrice = filters.maxPrice;
        if (filters.size) params.size = filters.size;
        if (filters.color) params.color = filters.color;
        if (filters.city) params.city = filters.city;
        if (filters.sellerId) params.sellerName = filters.sellerId; // sellerId is used as sellerName in frontend
        const response = await axios.get('http://localhost:8080/api/dresses', { params });
        setDresses(response.data);
      } catch (error) {
        console.error('Error fetching dresses:', error);
      }
    };
    fetchDresses();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{t('dresses')}</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">{t('category')}</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="">{t('allCategories')}</option>
            <option value="Evening">Evening</option>
            <option value="Casual">Casual</option>
            <option value="Wedding">Wedding</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">{t('country')}</label>
          <select
            name="countryName"
            value={filters.countryName}
            onChange={handleFilterChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="">{t('allCountries')}</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">{t('city')}</label>
          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder={t('city')}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">{t('maxPrice')}</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder={t('maxPrice')}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">{t('size')}</label>
          <select
            name="size"
            value={filters.size}
            onChange={handleFilterChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="">{t('allSizes')}</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="32">32</option>
            <option value="34">34</option>
            <option value="36">36</option>
            <option value="38">38</option>
            <option value="40">40</option>
            <option value="42">42</option>
            <option value="44">44</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">{t('color')}</label>
          <input
            type="text"
            name="color"
            value={filters.color}
            onChange={handleFilterChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder={t('color')}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">{t('designer')}</label>
          <input
            type="text"
            name="sellerId"
            value={filters.sellerId}
            onChange={handleFilterChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder={t('designer')}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dresses.map((dress) => (
          <div key={dress.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{dress.name}</h2>
            <p className="text-gray-600">{dress.description}</p>
            <p className="text-lg font-bold">{dress.price} €</p>
            <p>{t('category')}: {dress.category}</p>
            <p>{t('size')}: {dress.size}</p>
            <p>{t('color')}: {dress.color}</p>
            <p>{t('city')}: {dress.city}</p>
            <p>{t('country')}: {dress.countryName}</p>
            <p>{t('designer')}: {dress.sellerName}</p>
            <Link
              to={`/dresses/${dress.id}`}
              className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              {t('viewDetails')}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dresses;