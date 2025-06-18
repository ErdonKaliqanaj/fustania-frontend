import{ useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import DressFilterForm from '../components/DressFilterForm';
import DressCard from '../components/DressCard';

const DressesPage = () => {
    const { t } = useTranslation();
    const [dresses, setDresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDresses = async (filters = {}) => {
        setLoading(true);
        try{
            const params = new URLSearchParams();
            Object.keys(filters).forEach((key) => {
                if(filters[key]) params.append(key, filters[key]);
            
            });
            const response = await axios.get(`http://localhost:8080/api/dresses?${params.toString()}`);
            setDresses(response.data);
            setLoading(false);

        } catch (err){
            setError(t('error'));
            setLoading(false);
        }
    };

    useEffect(() =>{
        fetchDresses();
    }, []);

    const handleFilter = (data) => {
        fetchDresses(data);
    }

    const handleClear = () => {
        fetchDresses();
    };

    if(loading){
        return <div className='min-h-screen flex items-center justify-center text-gray-600'>{t('loading')}</div>;
    }

    if(error){
        return <div className='min-h-screen flex items-center justify-center text-red-700'> {error}</div>
    }
    
    return(
        <div className='min-h-screen bg-gray-300 py-8'>
            <div className='container mx-auto px-4'>
                <h1 className='text-3xl font-bold mb-6 text-center text-gray-900'>{t('dresses')}</h1>
                  <DressFilterForm onFilter={handleFilter} onClear={handleClear}/>
                  {dresses.length === 0 ? (
                    <p className='text-center text-gray-500'>{t('noDressesFound')}</p>
                  ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {dresses.map((dress) => (
                            <DressCard key={dress.id} dress={dress}/>
                        ))}
                    </div>
                  )}
            </div>

        </div>
    )
}

export default DressesPage;