import react, { useEffect } from "react";
import {useState, useEfect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useTranslation } from "react-i18next";

function DressList(){
    const {t} = useTranslation();
    const[filters, setFilters] = useState({
        designer:'',
        size:'',
        maxPrice:'',
        color:'',
        country:'',
        city:''
    });

    const[dresses, setDresses] = useState([]);
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(null);

    const handleFilterChange = (e) =>{
        setFilters({...filters, [e.target.name] : e.target.value});
    };

    const clearFilters = () =>{
        setFilters({
            designer:'',
            size:'',
            maxPrice:'',
            color:'',
            country:'',
            city:''
        });
    };

    const saveSearch = () =>{
        localStorage.setItem('savedSearch', JSON.stringify(filters));
        alert(t('search_saved'));
    };

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8080/api/dresses', {params: filters})
        .then(res => {
            setDresses(res.data);
            setError(null);
        })
        .catch(err => {
            console.error('Error fetching dresses:', err);
            setError(t('error_fetching_dresses'));
        })
        .finally(() => setLoading(false));
    }, [filters, t]);

    return(
        <div className="max-w-7xl mx-auto p-6" >
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{t('dresses')}</h2>
             |<div className="bg-white p-4 rounded-lg shadow-md mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('designer')}</label>
                        <input
                        name="designer"
                        placeholder={t('designer')}
                        value={filters.designer}
                        onChange={handleFilterChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('size')}</label>
                        <input
                        name="size"
                        placeholder={t('size')}
                        value={filters.size}
                        onchange={handleFilterChange}
                        className="w-full p-2 border border-gary-300 rounded-md focus:ring-2 focus:ring-gray-500 foucus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('max_price')}</label>
                        <input
                        name="maxPrice"
                        type="number"
                        placeholder={t('max_price')}
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('color')}</label>
                        <input
                        name="color"
                        placeholder={t('color')}
                        value={filters.color}
                        onChange={handleFilterChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"/>
                    </div>
                     <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">{t('country')}</label>
                         <select
                         name="country"
                         value={filters.country}
                         onChange={handleFilterChange}
                         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"
                         >
                            <option value="">{t('select_country')}</option>
                            <option value="Kosova">{t('Kosova')}</option>
                            <option value="Albania">{t('Albania')}</option>
                            <option value="Macedonia">{t('Macedonia')}</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-medium to-gray-700 mb-1" >{t('city')}</label>
                        <input
                        name="city"
                        placeholder={t('city')}
                        value={filters.city}
                        onChange={handleFilterChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"/>
                     </div>
                     <div className="flex gap-2 items-end">
                        <button
                        onClick={clearFilters}
                        className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors w-full"
                        >
                            {t('clear_filters')}
                        </button>
                        <button
                        onClick={saveSearch}
                        className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors w-full
                        ">
                            {t('save_search')}</button>
                     </div>

                </div>

             </div>
        </div>
    )

}

export default DressList;