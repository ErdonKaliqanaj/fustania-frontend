import React, {useState} from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Register = () => {
    const { t } = useTranslation();
    const[formData, setFormData] = useState({
        emri: '',
        mbiemri:'',
        email:'',
        password:'',
        shteti: 'Kosova'
    });

    const[error, setError] = useState('');
    const[success, setSuccess] = useState('');

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit  = async (e) =>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:8080/api/users/register', formData);
            setSuccess(t('registrationSuccessful'));
            setError('')
            setFormData({emri: '', mbiemri:'', email:'', password: '', shteti:'Kosova'});
            setTimeout(() => setSuccess(''), 3000);
        }catch(err){
            setError(t('registrationFailed') + (err.response?.data?.message ?? t('unknownError')));
            setSuccess('');
            console.error('Registration error:', err);
        }
    }

    return(
<div className='min-h-screen flex items-center justify-center bg-gray-100'>
    <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-6 text-center hover:text-3xl text-fuchsia-400'>{t('register')}</h2>
        {error && <p className='text-red-500 mb-4 hover:text-red-800 '>{error}</p>}
        {success && <p className='text-green-500 mb-4 hover:text-green-900'>{success}</p>}
        <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <label className='block text-gray-700'>{t('firstName')}</label>
                <input
                type='text'
                name='emri'
                value={formData.emri}
                onChange={handleChange}
                className='w-full p-3 border rounded'
                required/>
            </div>
            <div className="mb-4">
            <label className="block text-gray-700">{t('lastName')}</label>
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
            <label className="block text-gray-700">{t('email')}</label>
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
            <label className="block text-gray-700">{t('password')}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
            />
          </div>
<div className="mb-4">
            <label className="block text-gray-700">{t('country')}</label>
            <select
              name="shteti"
              value={formData.shteti}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
            >
              <option value="KOSOVA">Kosovë</option>
              {/* <option value="ALBANIA">Albania</option> */}
              {/* <option value="MAQEDONIA">Maqedoni</option> */}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
          >
            {t('register')}
          </button>
        </form>
    </div>

</div>
    )
}
export default Register;