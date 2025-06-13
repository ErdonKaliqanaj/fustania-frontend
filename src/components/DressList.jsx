import React,{useState} from "react";
import { useTranslation } from "react-i18next";

const DressList = () =>{
    const { t } = useTranslation();
    const[filters, setFilters] = useState({
        designer:'',
        sizeRange:'',
        maxPrice:'',
        color:'',
        country:'',
        city:''
    });

    //demo e fustanave
    const [dresses] = useState([
    {id:1, name:'Red Dress', designer:'Valdrin Sahiti', size:'M', price:50, color:'red', country:'Kosove', city:'Istog'},
    {id:2, name:'Blue Gown', designer:'Drenusha Xharra', size:"L", price:150, color:'blue', country:"Kosove", city:'Kline'},
]);

const handleFilterChange = (e) =>{
  setFilters({...filters, [e.target.name]: e.target.value});
};

const filteredDresses = dresses.filter(dress => {
    return(
        (filters.designer === '' || dress.designer.toLowerCase().includes(filters.designer.toLowerCase())) &&
        (filters.sizeRange === '' || dress.size === filters.sizeRange) &&
        (filters.maxPrice === '' || dress.price <= parseInt(filters.maxPrice)) &&
        (filters.color === '' || dress.color.toLowerCase().includes(filters.color.toLowerCase())) &&
        (filters.country === '' || dress.country === filters.country) &&
        (filters.city === '' || dress.city.toLowerCase.includes(filters.city.toLowerCase()))
    );
})
return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">{t('dressList')}</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t('filters')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="designer"
            value={filters.designer}
            onChange={handleFilterChange}
            placeholder={t('designer')}
            className="p-2 border rounded"
          />
          <select
            name="sizeRange"
            value={filters.sizeRange}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">{t('allSizes')}</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="3XL">3XL</option>
          </select>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder={t('maxPrice')}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="color"
            value={filters.color}
            onChange={handleFilterChange}
            placeholder={t('color')}
            className="p-2 border rounded"
          />
          <select
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">{t('allCountries')}</option>
            <option value="KOSOVA">Kosovë</option>
          </select>
          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            placeholder={t('city')}
            className="p-2 border rounded"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredDresses.map(dress => (
          <div key={dress.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{dress.name}</h3>
            <p>{t('designer')}: {dress.designer}</p>
            <p>{t('size')}: {dress.size}</p>
            <p>{t('price')}: ${dress.price}</p>
            <p>{t('color')}: {dress.color}</p>
            <p>{t('location')}: {dress.city}, {dress.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DressList;