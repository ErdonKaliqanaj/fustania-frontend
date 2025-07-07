import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function AddDressForm({ formData, handleChange, handleSubmit, errors, setIsAddingDress }) {
  const { t } = useTranslation();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/countries');
        setCountries(response.data.map(country => country.name));
      } catch (err) {
        console.error('Error fetching countries:', err);
      }
    };
    fetchCountries();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">{t('dressName')}</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">{t('description')}</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
          rows="3"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">{t('price')}</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
          min="0"
          step="0.01"
        />
        {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">{t('category')}</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
        >
          <option value="">{t('selectCategory')}</option>
          <option value="Evening">{t('evening')}</option>
          <option value="Casual">{t('casual')}</option>
          <option value="Wedding">{t('wedding')}</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">{t('size')}</label>
        <select
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
        >
          <option value="">{t('selectSize')}</option>
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
      <div>
        <label className="block text-sm font-medium text-gray-700">{t('color')}</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">{t('city')}</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">{t('country')}</label>
        <select
          name="countryName"
          value={formData.countryName}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
        >
          <option value="">{t('selectCountry')}</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        {errors.countryName && <p className="text-red-600 text-sm mt-1">{errors.countryName}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">{t('photoUrl')}</label>
        <input
          type="text"
          name="photoUrl"
          value={formData.photoUrl}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
        />
      </div>
      <div className="sticky bottom-0 bg-white pt-4 -mb-4 flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => setIsAddingDress(false)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
        >
          {t('cancel')}
        </button>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200"
        >
          {t('createDress')}
        </button>
      </div>
    </form>
  );
}

export default AddDressForm;