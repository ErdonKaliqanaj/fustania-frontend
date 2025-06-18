import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import axios from "axios";

const ContactSellerForm = ({dressId}) => {
    const {t} = useTranslation();
    const{register, handleSubmit, reset, formState: {errors}} = useForm();
    const [status, setStatus] = useState(null);

    const onSubmit = async (data) => {
        try{
            const payload = {
                content: data.content,
                offerPrice: data.offerPrice ? parseFloat(data.offerPrice) : null,
                senderEmail: data.email,
                senderName: data.name,
                dressId: dressId,
            };
            await axios.post('http://localhost:8080/api/messages', payload);
            setStatus({type: 'success', message: t('messageSuccess')});
        reset();
        } catch (error){
            setStatus({type:'error', message: t('messageError')});
        }
    };

    return(
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">{t('contactSeller')}</h2>
        <from onSubmit={handleSubmit(onSubmit)} 
        className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">{t('sellerName')}</label>
                <input 
                type="text"
                {...register('name', { required: t('nameRequired')})}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('enterName')} 
                />
                {errors.name && <span className="text-red-600 text-sm">
                    {errors.name.message}</span>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">{t('email')}</label>
                <input
                type="email"
                {...register('email', {
                    required: t('emailRequired'),
                    pattern:{
                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: t('emailInvalid'), 
                    },
                })}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('enterEmail')}
                />
                {errors.email && <span className="text-red-600 text-sm">
                    {errors.email.message}</span>}
            </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('message')}</label>
                    <textarea
                    {...register('content', {required: t('messageRequired') })}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-b-blue-500 "
                    placeholder={t('enterMessage')}
                    rows="4"
                    />
                    {errors.content && <span className="text-red-600 text-sm">
                        {errors.content.message}</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('offerPrice')}</label>
                    <input
                    type="number"
                    step="0.01"
                    {...register('offerPrice')}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                    placeholder={t('enterOfferPrice')}
                    />
                </div>

                {status && (
                    <div className={`text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                        {status.message}
                    </div>
                )}

                <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
                >
                      {t('sendMessage')}
                </button>
        </from>
        </div>
    )
}
export default ContactSellerForm;