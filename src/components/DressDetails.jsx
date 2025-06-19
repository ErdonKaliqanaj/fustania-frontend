import { useTranslation } from 'react-i18next';

const DressDetails = ({ dress }) => {
  const { t } = useTranslation();

  if (!dress) {
    return <div className="text-center text-gray-600">{t('loading')}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{dress.description}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {dress.photos && dress.photos.length > 0 ? (
            <img
              src={dress.photos[0]}
              alt={dress.description}
              className="w-full h-64 object-cover rounded-md"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center">
              {t('error')}
            </div>
          )}
        </div>
        <div>
          <p className="text-gray-600"><strong>{t('profilePage.price')}:</strong> €{dress.price?.toFixed(2)}</p>
          <p className="text-gray-600"><strong>{t('profilePage.size')}:</strong> {dress.size}</p>
          <p className="text-gray-600"><strong>{t('profilePage.color')}:</strong> {dress.color}</p>
          <p className="text-gray-600"><strong>{t('profilePage.designer')}:</strong> {dress.designer}</p>
          <p className="text-gray-600"><strong>{t('profilePage.location')}:</strong> {dress.qyteti}, {dress.shteti}</p>
          <p className="text-gray-600 mt-4">{dress.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DressDetails;