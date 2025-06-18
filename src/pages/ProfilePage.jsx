import axios from "axios";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const ProfilePage = () =>{
    const { t } = useTranslation();
     const {
       register,
       handleSubmit,
       formState: { errors },
     } = useForm();
     const [submitStatus, setSubmitStatus] = useState(null);
   
     const onSubmit = async (data) => {
       try {
         const response = await axios.post('http://localhost:8080/api/auth/register', {
           firstName: data.firstName,
           lastName: data.lastName,
           email: data.email,
           password: data.password,
           address: data.address,
           shteti: data.shteti,
           role: data.role,
         });
         setSubmitStatus(t('registrationSuccess'));
         console.log('User registered:', response.data);
       } catch (error) {
         const errorMessage =
           error.response?.data || t('registrationError');
         setSubmitStatus(errorMessage);
         console.error('Registration failed:', error);
       }
     };
   
     return (
       <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
           <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{t('register')}</h2>
           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
             
             <div>
               <label className="block text-sm font-medium text-gray-700">{t('firstName')}</label>
               <input
                 {...register('firstName', { required: t('firstNameRequired') })}
                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                 placeholder={t('enterFirstName')}
               />
               {errors.firstName && (
                 <p className="mt-1 text-red-600 text-sm">{errors.firstName.message}</p>
               )}
             </div>
   
             
             <div>
               <label className="block text-sm font-medium text-gray-700">{t('lastName')}</label>
               <input
                 {...register('lastName', { required: t('lastNameRequired') })}
                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                 placeholder={t('enterLastName')}
               />
               {errors.lastName && (
                 <p className="mt-1 text-red-600 text-sm">{errors.lastName.message}</p>
               )}
             </div>
   
             
             <div>
               <label className="block text-sm font-medium text-gray-700">{t('email')}</label>
               <input
                 type="email"
                 {...register('email', {
                   required: t('emailRequired'),
                   pattern: {
                     value: /^\S+@\S+$/i,
                     message: t('emailInvalid'),
                   },
                 })}
                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                 placeholder={t('enterEmail')}
               />
               {errors.email && (
                 <p className="mt-1 text-red-600 text-sm">{errors.email.message}</p>
               )}
             </div>
   
            
             <div>
               <label className="block text-sm font-medium text-gray-700">{t('password')}</label>
               <input
                 type="password"
                 {...register('password', {
                   required: t('passwordRequired'),
                   minLength: {
                     value: 6,
                     message: t('passwordMinLength'),
                   },
                 })}
                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                 placeholder={t('enterPassword')}
               />
               {errors.password && (
                 <p className="mt-1 text-red-600 text-sm">{errors.password.message}</p>
               )}
             </div>
   
            
             <div>
               <label className="block text-sm font-medium text-gray-700">{t('address')}</label>
               <input
                 {...register('address', { required: t('addressRequired') })}
                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                 placeholder={t('enterAddress')}
               />
               {errors.address && (
                 <p className="mt-1 text-red-600 text-sm">{errors.address.message}</p>
               )}
             </div>
   
             
             <div>
               <label className="block text-sm font-medium text-gray-700">{t('country')}</label>
               <select
                 {...register('shteti', { required: t('countryRequired') })}
                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
               >
                 <option value="">{t('selectCountry')}</option>
                 <option value="KOSOVE">{t('kosovo')}</option>
                 <option value="SHQIPERI">{t('albania')}</option>
                 <option value="MAQEDONI">{t('macedonia')}</option>
               </select>
               {errors.shteti && (
                 <p className="mt-1 text-red-600 text-sm">{errors.shteti.message}</p>
               )}
             </div>
   
             
             <div>
               <label className="block text-sm font-medium text-gray-700">{t('role')}</label>
               <select
                 {...register('role', { required: t('roleRequired') })}
                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
               >
                 <option value="">{t('selectRole')}</option>
                 <option value="SELLER">{t('seller')}</option>
                 <option value="BUYER">{t('buyer')}</option>
               </select>
               {errors.role && (
                 <p className="mt-1 text-red-600 text-sm">{errors.role.message}</p>
               )}
             </div>
   
             
             <button
               type="submit"
               className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
             >
               {t('register')}
             </button>
           </form>
   
           {submitStatus && (
             <p
               className={`mt-4 text-center ${
                 submitStatus.includes('Error') || submitStatus.includes('Gabim')
                   ? 'text-red-600'
                   : 'text-green-600'
               }`}
             >
               {submitStatus}
             </p>
           )}
   
           
           <p className="mt-4 text-center text-gray-600">
             {t('alreadyHaveAccount')}{' '}
             <Link to="/login" className="text-blue-600 hover:underline">
               {t('login')}
             </Link>
           </p>
         </div>
       </div>
     );
   };
export default ProfilePage;