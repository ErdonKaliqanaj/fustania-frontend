import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const DressCard = ({dress}) =>{
    const { t } = useTranslation();

    return(
       <div className="bg-white rounded-lg shadow-lg overflow-x-hidden">
        <img
        src={dress.photos[0] || 'https://via.placeholder.com/400'}
        alt={dress.description}
        className="w-full h-48 object-cover"
        />
        <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{dress.description}</h3>
            <p className="text-gray-600">{t('city')}: {dress.designer}</p>
            <p className="text-gray-600">{t('city')}: €{dress.price.toFixed(3) }</p>
            <p className="text-gray-600">{t('city')}: {dress.size}</p>
            <p className="text-gray-600">{t('city')}: {dress.color}</p>
            <p className="text-gray-600">{t('city')}: {dress.qyteti}, {dress.shteti}</p>
            <Link to={`/dresses/${dress.id}`}
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              {t('dressDetails')}
            </Link>

        </div>

       </div>
    )
}

export default DressCard;