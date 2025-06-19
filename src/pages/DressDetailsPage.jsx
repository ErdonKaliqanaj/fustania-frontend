import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import DressDetails from '../components/DressDetails';
import ContactSellerForm from '../components/ContactSellerForm';

const DressDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [dress, setDress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDress = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/dresses/${id}`);
        setDress(response.data);
        setLoading(false);
      } catch (err) {
        setError(t('error'));
        setLoading(false);
      }
    };
    fetchDress();
  }, [id, t]);

  if (loading) return <div className="text-center text-gray-600">{t('loading')}</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <DressDetails dress={dress} />
      <ContactSellerForm />
    </div>
  );
};

export default DressDetailsPage;