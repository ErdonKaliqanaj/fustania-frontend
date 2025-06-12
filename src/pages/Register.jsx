import React, {useState} from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Register = () => {
   const {t} = useTranslation();
   const [formData, setFormData] = useState({
    emri: '',
    mbiemri: '',
    password: '',
    shteti:'KOSOVA',
   });

   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');

   const handleChange = (e) => {
    setFormData({...FormData, [e.target.name] : e.target.value});
   };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post(`http://localhost:8080/api/users/register`, formData);
        setSuccess(t('Registration successful'));
        setError(null, 3000)
        setError(' ');
        setFormData({emri: '', mbiemri: '', email: '', password: '', shteti: 'KOSOVA'});
    }catch(err){
        setError(t('Registration failed: ') + (err.response?.data?.message ?? t('Unknown error')));
        setSuccess('');
    }
   }
   return(
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold mb-6 text-center'>{t('register')}</h2>
            {error && <p className='text-red-500 mb-4'>{error}</p>}
            {success && <p className='text-green-500 mb-4'>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700'>{t('Emri')}</label>
                    <input
                    type='text'
                    name='emri'
                    value={formData.emri}
                    onChange={handleChange}
                    className='w-full p-3 border rounded'
                    required
                    />
                </div>
                <div className="mb-4">
            <label className="block text-gray-700">{t('Mbiemri')}</label>
            <input
              type="text"
              name="mbiemri"
              value={formData.mbiemri}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{t('Email')}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{t('Password')}</label>
            <input
              type="password"
              name="password"
              value={formData.mbiemri}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{t('Shteti')}</label>
            <select
              name="shteti"
              value={formData.mbiemri}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
              >
                <option value="KOSOVA">{t('KOSOVA')}
                {/* <option value="SHQIPERI">{t('Shqiperi')}</option> */}
                {/*  <option value="MAQEDONI">{t('Maqedoni')},</option> */}
                </option>
           </select>
          </div>
          <button
          type='submit'
          className='w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600'>
          {t('Register')}
          </button>

            </form>
        </div>

    </div>
   )
}
export default Register;