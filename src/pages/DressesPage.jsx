import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import DressFilterForm from '../components/DressFilterForm';
import DressCard from '../components/DressCard';
const DressesPage = () => {
  const { t } = useTranslation();
  const [dresses, setDresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // memoizojmë fetchDresses për ta shmangur warning
  const fetchDresses = useCallback(async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(`http://localhost:8080/api/dresses?${params}`);
      setDresses(response.data);
      setLoading(false);
    } catch (err) {
      setError(t('error'));
      setLoading(false);
    }
  }, [t]);  // t nga i18next është dependency sepse e përdor në catch

  useEffect(() => {
    fetchDresses();
  }, [fetchDresses]);

  const handleFilter = (filters) => {
    setLoading(true);
    fetchDresses(filters);
  };

  if (loading) return <div className="text-center text-gray-600">{t('loading')}</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('dressesPage.title')}</h1>
      <DressFilterForm onFilter={handleFilter} />
      {dresses.length === 0 ? (
        <p className="text-gray-600">{t('dressesPage.noDresses')}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dresses.map(dress => (
            <DressCard key={dress.id} dress={dress} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DressesPage;
