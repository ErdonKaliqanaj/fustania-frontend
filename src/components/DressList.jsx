import React,{useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import {Link} from 'react-router-dom'

const DressList = () =>{
    const { t } = useTranslation();
    const[dresses, setDresses] = useState([]);
    const[filters, setFilters] = useState({
        designer:'',
        size:'',
        maxPrice:'',
        color:'',
        shteti:'',
        qyteti:''
    });
    const[loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDresses = async () => {
      setLoading(true);
      try{
           const response = await axios.get('http://localhost:8080/api/dresses', {
            params:filters,
           });
           setDresses(response.data);
      }catch(error){
        console.error('Error fetching dresses:', error);
      } finally{
        setLoading(false)
      }
    };
    fetchDresses();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({...filters, [e.target.name]: e.target.value})
  }

return (
   <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{t('allDresses')}</h2>

      {/* Formulari i Filtrimit */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-100 rounded-lg">
        <div>
          <label className="block text-sm font-medium">{t('designer')}</label>
          <input
            name="designer"
            value={filters.designer}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
            placeholder={t('enterDesigner')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">{t('size')}</label>
          <select
            name="size"
            value={filters.size}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">{t('selectSize')}</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">{t('maxPrice')}</label>
          <input
            name="maxPrice"
            type="number"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
            placeholder={t('enterMaxPrice')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">{t('color')}</label>
          <input
            name="color"
            value={filters.color}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
            placeholder={t('enterColor')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">{t('country')}</label>
          <select
            name="shteti"
            value={filters.shteti}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">{t('selectCountry')}</option>
            <option value="KOSOVE">{t('kosovo')}</option>
            <option value="SHQIPERI">{t('albania')}</option>
            <option value="MAQEDONI">{t('macedonia')}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">{t('city')}</label>
          <input
            name="qyteti"
            value={filters.qyteti}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
            placeholder={t('enterCity')}
          />
        </div>
      </div>

      {/* Lista e Fustaneve */}
      {loading ? (
        <p>{t('loading')}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dresses.length === 0 ? (
            <p>{t('noDressesFound')}</p>
          ) : (
            dresses.map((dress) => (
              <div
                key={dress.id}
                className="border rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={dress.photoUrl}
                  alt={dress.description}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{dress.description}</h3>
                  <p className="text-gray-600">{t('price')}: {dress.price} €</p>
                  <p className="text-gray-600">{t('size')}: {dress.size}</p>
                  <Link
                    to={`/dresses/${dress.id}`}
                    className="mt-2 inline-block text-blue-600 hover:underline"
                  >
                    {t('viewDetails')}
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default DressList;