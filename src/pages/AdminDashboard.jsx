import React from 'react';
import Navbar from '../components/Navbar';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
  const { t } = useTranslation();

  // demo
  const users = [
    { id: 1, emri: 'Test', mbiemri: 'Testi', email: 'test@example.com' },
    { id: 2, emri: 'User', mbiemri: 'Useri', email: 'user@example.com' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAdmin={true} />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">{t('Admin Dashboard')}</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">{t('Registered Users')}</h3>
          {users.length > 0 ? (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3">{t('Emri')}</th>
                  <th className="p-3">{t('Mbiemri')}</th>
                  <th className="p-3">{t('Email')}</th>
                  <th className="p-3">{t('Actions')}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="p-3">{user.emri}</td>
                    <td className="p-3">{user.mbiemri}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        {t('View Publications')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>{t('No users registered')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;