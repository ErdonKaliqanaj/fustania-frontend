import { Link } from 'react-router-dom';
  import { useTranslation } from 'react-i18next';

  const DressCard = ({ dress }) => {
    const { t } = useTranslation();

    return (
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-200">
        <img
          src={dress.photos?.[0] || 'https://via.placeholder.com/150'}
          alt={dress.description}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-lg font-semibold">{dress.description}</h3>
        <p className="text-gray-600">{t('profilePage.price')}: €{dress.price.toFixed(2)}</p>
        <p className="text-gray-600">{t('profilePage.size')}: {dress.size}</p>
        <p className="text-gray-600">{t('profilePage.color')}: {dress.color}</p>
        <p className="text-gray-600">{t('profilePage.designer')}: {dress.designer}</p>
        <p className="text-gray-600">{t('profilePage.location')}: {dress.qyteti}, {dress.shteti}</p>
        <Link
          to={`/dresses/${dress.id}`}
          className="mt-2 inline-block text-blue-600 hover:underline"
        >
          {t('dressDetails.contactSeller')}
        </Link>
      </div>
    );
  };

  export default DressCard;