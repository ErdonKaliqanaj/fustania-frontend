import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const DressFilterForm = ({ onFilter }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const filters = {};
    if (data.designer) filters.designer = data.designer;
    if (data.size) filters.size = data.size;
    if (data.maxPrice) filters.maxPrice = data.maxPrice;
    if (data.color) filters.color = data.color;
    if (data.qyteti) filters.qyteti = data.qyteti;
    if (data.shteti) filters.shteti = data.shteti;
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">{t('dressesPage.filter')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('dressesPage.designer')}</label>
          <input
            type="text"
            {...register('designer')}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('dressesPage.size')}</label>
          <input
            type="text"
            {...register('size')}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('dressesPage.maxPrice')}</label>
          <input
            type="number"
            step="0.01"
            {...register('maxPrice')}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('dressesPage.color')}</label>
          <input
            type="text"
            {...register('color')}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('dressesPage.city')}</label>
          <input
            type="text"
            {...register('qyteti')}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('dressesPage.country')}</label>
          <select
            {...register('shteti')}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('register.country')}</option>
            <option value="KOSOVE">{t('register.kosovo')}</option>
             <option value="SHQIPERI">{t('register.albania')}</option> 
             <option value="MAQEDONI">{t('register.macedonia')}</option> 
          </select>
        </div>
      </div>
      <div className="flex space-x-4 mt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
        >
          {t('dressesPage.filter')}
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="w-full bg-gray-300 text-gray-800 p-3 rounded-md hover:bg-gray-400 transition duration-200"
        >
          {t('dressesPage.clear')}
        </button>
      </div>
    </form>
  );
};

export default DressFilterForm;