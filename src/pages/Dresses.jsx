import React, { useState, useEffect} from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

const Dresses = () => {
    const { t } = useTranslation();
    const[ dresses, setDresses] = useState([]);
    const[ filters, setFilters] = useState({
        dizajneri:'',
        masa:'',
        maxCmimi:'',
        ngjyra:'',
        shteti:'',
        qyteti:'',
    });

    useEffect(() =>{
        fetchDresses();
    } , []);

    const fetchDresses = async () =>{
        try{
            const params = new URLSearchParams(filters).toString();
            const response = await axios.get(`http://localhost:8080/api/dresses?${params}`);
            setDresses(response.data);
        }catch(error){
            console.error('Error fetching dresses:', error);
        }
    }
    const handleFilterChange = (e) => {
        setFilters({...filters, [e.target.name] : e.target.value});
    }
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchDresses();
    }

    return(
        <div className="min-h-screen bg-gray-100">
            <Navbar isAdmin={false}/>
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-6">{t('Dresses')}</h2>

                <form onSubmit={handleFilterSubmit} className="mb-6 bg-white p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-gray-700">{t('Designer')}</label>
                            <input
                            type="text"
                            name="dizajneri"
                            value={filters.dizajneri}
                            onChange={handleFilterChange}
                            className="w-full p-3 border rounded"
                            />
                        </div>
                        <div>
              <label className="block text-gray-700">{t('Size')}</label>
              <select
                name="masa"
                value={filters.masa}
                onChange={handleFilterChange}
                className="w-full p-3 border rounded"
              >
                <option value="">{t('All Sizes')}</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">{t('Max Price')}</label>
              <input
                type="number"
                name="maxCmimi"
                value={filters.maxCmimi}
                onChange={handleFilterChange}
                className="w-full p-3 border rounded"
                min="0"
              />
            </div>
            <div>
              <label className="block text-gray-700">{t('Color')}</label>
              <select
                name="ngjyra"
                value={filters.ngjyra}
                onChange={handleFilterChange}
                className="w-full p-3 border rounded"
              >
                <option value="">{t('All Colors')}</option>
                <option value="Red">{t('Red')}</option>
                <option value="Black">{t('Black')}</option>
                <option value="Blue">{t('Blue')}</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">{t('Shteti')}</label>
              <select
                name="shteti"
                value={filters.shteti}
                onChange={handleFilterChange}
                className="w-full p-3 border rounded"
              >
                <option value="">{t('All Countries')}</option>
                <option value="KOSOVE">{t('Kosove')}</option>
                <option value="SHQIPERI">{t('Shqiperi')}</option>
                <option value="MAQEDONI">{t('Maqedoni')}</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">{t('Qyteti')}</label>
              <input
                type="text"
                name="qyteti"
                value={filters.qyteti}
                onChange={handleFilterChange}
                className="w-full p-3 border rounded"
              />
            </div>
                    </div>
                    <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {t('Apply Filters')}
          </button>

                </form>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dresses.length > 0 ? (
            dresses.map((dress) => (
              <div key={dress.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{dress.title}</h3>
                <p>{t('Designer')}: {dress.dizajneri}</p>
                <p>{t('Size')}: {dress.masa}</p>
                <p>{t('Price')}: {dress.cmimi}€</p>
                <p>{t('Color')}: {dress.ngjyra}</p>
                <p>{t('Location')}: {dress.shteti}{dress.qyteti ? `, ${dress.qyteti}` : ''}</p>
                <p>{t('Seller')}: {dress.seller.emri} {dress.seller.mbiemri}</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  {t('View Details')}
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center">{t('No dresses found')}</p>
          )}
        </div>
            </div>

        </div>
    )
}

export default Dresses;