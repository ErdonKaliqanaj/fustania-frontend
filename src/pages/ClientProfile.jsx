import React from "react";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

const ClientProfile = () => {
    const { t } = useTranslation();

    //demo
    const publications = [
    { id: 1, title: 'Fustan i kuq', price: 50, size: 'M' },
    { id: 2, title: 'Fustan i zi', price: 70, size: 'S' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAdmin={false} />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">{t('Your Profile')}</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">{t('Your Publications')}</h3>
          {publications.length > 0 ? (
            <ul className="space-y-4">
              {publications.map((pub) => (
                <li key={pub.id} className="border p-4 rounded">
                  <h4 className="font-medium">{pub.title}</h4>
                  <p>{t('Price')}: {pub.price}€</p>
                  <p>{t('Size')}: {pub.size}</p>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    {t('Edit')}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>{t('No publications yet')}</p>
          )}
          <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            {t('Add New Publication')}
          </button>
        </div>
      </div>
    </div>
  );
};
 export default ClientProfile;