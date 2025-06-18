import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const DressFilterForm = ({onFilter, onClear}) => {
    const {t} = useTranslation();
    const {register, handleSubmit} = useForm();

    const onSumbit = (data) => {
        onFilter(data);
    };

    return(
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text 2-xl font-bold mb-4 text-gray-800">{t('filtersDresses')}</h2>
            <form onSubmit={handleSubmit(onSumbit)} 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"  
            >
             <div>
                <label className="block text-sm font-medium text-gray-700">{t('designer')}</label>
                <input
                {...register('designer')}
                className="mt-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('enterDesigner')}
                />
             </div>

             <div>
                <label className="block text-sm font medium text-gray-700">{t('sizeSelect')}</label>
                <select
                {...register('size')}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                >
                    <option value="">{t('selectSize')}</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
             </div>

             <div>
                <label className="block text-sm font-medium text-gray-700">{t('maxPrice')}</label>
                <input 
                type="number"
                {...register('maxPrice')}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('enterMaxPrice')}
                step="0.01"
                />
             </div>

             <div>
          <label className="block text-sm font-medium text-gray-700">{t('color')}</label>
          <input
            {...register('color')}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('enterColor')}
          />
        </div>

         <div>
          <label className="block text-sm font-medium text-gray-700">{t('country')}</label>
          <select
            {...register('shteti')}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('selectCountry')}</option>
            <option value="KOSOVE">{t('kosovo')}</option>
            <option value="SHQIPERI">{t('albania')}</option>
            <option value="MAQEDONI">{t('macedonia')}</option>
          </select>
        </div>

         <div>
          <label className="block text-sm font-medium text-gray-700">{t('city')}</label>
          <input
            {...register('qyteti')}
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('enterCity')}
          />
        </div>

        <div className="col-span-full flex space-x-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 flex-1"
          >
            {t('filter')}
          </button>
          <button
            type="button"
            onClick={onClear}
            className="bg-gray-600 text-white p-3 rounded-md hover:bg-gray-700 transition duration-200 flex-1"
          >
            {t('clearFilters')}
          </button>
        </div>
            </form>

        </div>
    )
}
export default DressFilterForm;