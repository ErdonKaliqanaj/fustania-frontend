import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AddDressForm from '../components/AddDressForm';

function Profile() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [dresses, setDresses] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingDress, setIsAddingDress] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [dressForm, setDressForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    size: '',
    color: '',
    city: '',
    photoUrl: '',
    countryName: '',
    sellerId: 1
  });
  const [editErrors, setEditErrors] = useState({});
  const [dressErrors, setDressErrors] = useState({});
  const userId = 1; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8080/api/users/me?userId=${userId}`);
        setUser(userResponse.data);
        setEditForm({
          firstName: userResponse.data.firstName,
          lastName: userResponse.data.lastName,
          email: userResponse.data.email,
          password: ''
        });
        const dressesResponse = await axios.get(`http://localhost:8080/api/users/me/dresses?userId=${userId}`);
        setDresses(dressesResponse.data);
        const messagesResponse = await axios.get(`http://localhost:8080/api/users/me/messages?userId=${userId}`);
        setMessages(messagesResponse.data);
      } catch (err) {
        setError(t('errorFetchingData'));
      }
    };
    fetchData();
  }, [t]);

  const validateEditForm = () => {
    const errors = {};
    if (editForm.firstName && !editForm.firstName.match(/^[a-zA-Z]+$/)) {
      errors.firstName = t('firstNameInvalid');
    }
    if (editForm.lastName && !editForm.lastName.match(/^[a-zA-Z]+$/)) {
      errors.lastName = t('lastNameInvalid');
    }
    if (editForm.email && !editForm.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = t('emailInvalid');
    }
    if (editForm.password && !editForm.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) {
      errors.password = t('passwordInvalid');
    }
    return errors;
  };

  const validateDressForm = () => {
    const errors = {};
    if (!dressForm.name) {
      errors.name = t('dressNameRequired');
    }
    if (!dressForm.price) {
      errors.price = t('priceRequired');
    } else if (isNaN(dressForm.price) || dressForm.price <= 0) {
      errors.price = t('priceInvalid');
    }
    if (!dressForm.countryName) {
      errors.countryName = t('countryRequired');
    }
    return errors;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const errors = validateEditForm();
    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/users/me?userId=${userId}`, editForm);
      setUser({
        ...user,
        firstName: editForm.firstName || user.firstName,
        lastName: editForm.lastName || user.lastName,
        email: editForm.email || user.email
      });
      setIsEditing(false);
      setEditErrors({});
    } catch (err) {
      setEditErrors({ general: t('updateFailed') });
    }
  };

  const handleDressSubmit = async (e) => {
    e.preventDefault();
    const errors = validateDressForm();
    if (Object.keys(errors).length > 0) {
      setDressErrors(errors);
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/dresses', dressForm);
      const dressesResponse = await axios.get(`http://localhost:8080/api/users/me/dresses?userId=${userId}`);
      setDresses(dressesResponse.data);
      setIsAddingDress(false);
      setDressForm({
        name: '',
        description: '',
        price: '',
        category: '',
        size: '',
        color: '',
        city: '',
        photoUrl: '',
        countryName: '',
        sellerId: userId
      });
      setDressErrors({});
    } catch (err) {
      setDressErrors({ general: err.response?.data?.error || t('dressCreationFailed') });
    }
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
    setEditErrors({ ...editErrors, [e.target.name]: '' });
  };

  const handleDressChange = (e) => {
    setDressForm({ ...dressForm, [e.target.name]: e.target.value });
    setDressErrors({ ...dressErrors, [e.target.name]: '', general: '' });
  };

  if (error) {
    return <div className="text-center text-red-600 p-8">{error}</div>;
  }

  if (!user) {
    return <div className="text-center p-8">{t('loading')}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">{t('profile')}</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{t('userInformation')}</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200"
            >
              {isEditing ? t('cancel') : t('editProfile')}
            </button>
          </div>
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              {editErrors.general && <p className="text-red-600 text-center">{editErrors.general}</p>}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('firstName')}</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editForm.firstName}
                    onChange={handleEditChange}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
                  />
                  {editErrors.firstName && <p className="text-red-600 text-sm">{editErrors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('lastName')}</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editForm.lastName}
                    onChange={handleEditChange}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
                  />
                  {editErrors.lastName && <p className="text-red-600 text-sm">{editErrors.lastName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
                  />
                  {editErrors.email && <p className="text-red-600 text-sm">{editErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('password')}</label>
                  <input
                    type="password"
                    name="password"
                    value={editForm.password}
                    onChange={handleEditChange}
                    placeholder={t('leaveBlank')}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
                  />
                  {editErrors.password && <p className="text-red-600 text-sm">{editErrors.password}</p>}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200"
              >
                {t('saveChanges')}
              </button>
            </form>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <p><strong>{t('firstName')}:</strong> {user.firstName}</p>
              <p><strong>{t('lastName')}:</strong> {user.lastName}</p>
              <p><strong>{t('email')}:</strong> {user.email}</p>
              <p><strong>{t('role')}:</strong> {user.role === 'SELLER' ? t('seller') : t('buyer')}</p>
            </div>
          )}
        </div>

        
        {user.role === 'SELLER' && (
          <div className="mb-8">
            <button
              onClick={() => setIsAddingDress(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200"
            >
              {t('addNewDress')}
            </button>
          </div>
        )}

        
        {isAddingDress && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ease-in-out">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-95 sm:scale-100">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">{t('addNewDress')}</h2>
              {dressErrors.general && <p className="text-red-600 text-center mb-4">{dressErrors.general}</p>}
              <AddDressForm
                formData={dressForm}
                handleChange={handleDressChange}
                handleSubmit={handleDressSubmit}
                errors={dressErrors}
                setIsAddingDress={setIsAddingDress}
              />
            </div>
          </div>
        )}

        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('myDresses')}</h2>
          {dresses.length === 0 ? (
            <p className="text-center text-gray-600">{t('noDresses')}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dresses.map((dress) => (
                <div key={dress.id} className="border rounded-md overflow-hidden shadow-sm">
                  <img
                    src={dress.photoUrl}
                    alt={dress.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{dress.name}</h3>
                    <p className="text-gray-600">{t('price')}: {dress.price} €</p>
                    <p className="text-gray-600">{t('category')}: {dress.category}</p>
                    <p className="text-gray-600">{t('size')}: {dress.size}</p>
                    <p className="text-gray-600">{t('color')}: {dress.color}</p>
                    <p className="text-gray-600">{t('city')}: {dress.city}</p>
                    <button
                      className="mt-2 text-purple-600 hover:underline"
                      onClick={() => window.location.href = `/dresses/${dress.id}`}
                    >
                      {t('viewDetails')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{t('messagesAndOffers')}</h2>
          {messages.length === 0 ? (
            <p className="text-center text-gray-600">{t('noMessages')}</p>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className="border p-4 rounded-md">
                  <p><strong>{t('senderEmail')}:</strong> {message.senderEmail}</p>
                  <p><strong>{t('message')}:</strong> {message.content}</p>
                  {message.offerPrice && (
                    <p><strong>{t('offerPrice')}:</strong> {message.offerPrice} €</p>
                  )}
                  <p><strong>{t('dressId')}:</strong> {message.dressId}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;