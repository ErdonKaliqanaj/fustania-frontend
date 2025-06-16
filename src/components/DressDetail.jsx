import react from "react";
import {useState, useEffect} from 'react';
import { Link, useParams} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import axios from "axios";
import ContactSellerForm from "./ContactSellerForm";

const DressDetail = () =>{
    const{t} = useTranslation();
    const{id} = useParams();
    const[dress, setDress] = useState(null);
    const[error, setError] = useState('null');
    const[loading, setLoading] = useState('true');
     

 

    useEffect(() => {
        const fetchDress = async () => {
            setLoading(true);
            try{
                const response = await axios.get(`http://localhost:8080/api/dresses/${id}`);
                setDress(response.data);
            }catch(err){
                setError(t('errorFetchingDress'));
            }finally{
                setLoading(false);
            }
        }
        fetchDress();
    },[id, t]);

 if (loading) return <div className="text-center p-4">{t('loading')}</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;
  if (!dress) return <div className="text-center p-4">{t('dressNotFound')}</div>;
   return(
                 <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        {t('backToDresses')}
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seksioni i detajeve të fustanit */}
        <div>
          <img
            src={dress.photoUrl}
            alt={dress.description}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">{dress.description}</h2>
          <p className="text-gray-600 mb-2">
            {t('price')}: {dress.price} €
          </p>
          <p className="text-gray-600 mb-2">
            {t('size')}: {dress.size}
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2">{t('sellerInfo')}</h3>
          <p className="text-gray-600">
            {t('firstName')}: {dress.sellerFirstName}
          </p>
          <p className="text-gray-600">
            {t('lastName')}: {dress.sellerLastName}
          </p>
          <p className="text-gray-600">
            {t('email')}: {dress.sellerEmail}
          </p>
          <p className="text-gray-600">
            {t('address')}: {dress.sellerAddress}
          </p>
        </div>
      </div>

      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">{t('contactSeller')}</h3>
        <ContactSellerForm dressId={id} sellerId={dress.sellerId} />
      </div>
    </div>
        )
    }


export default DressDetail;