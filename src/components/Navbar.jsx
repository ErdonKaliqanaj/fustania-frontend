import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";


const Navbar = ({ isAdmin }) => {
  const { t } = useTranslation();

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">{t('Fustania')}</Link>
        <div className="space-x-4">
          <Link to="/">{t('Home')}</Link>
          {isAdmin ? (
            <Link to="/admin">{t('Admin Dashboard')}</Link>
          ) : (
            <Link to="/profile">{t('Profile')}</Link>
          )}
          <Link to="/register">{t('Register')}</Link>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;