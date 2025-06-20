import RegisterForm from '../components/RegisterForm';
  import LanguageSwitcher from '../components/LanguageSwitcher';

  const RegisterPage = () => {
    const handleSuccess = () => {
      console.log('Registration successful');
    };

    return (
      <div className="container mx-auto p-4 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <RegisterForm onSuccess={handleSuccess} />
        <LanguageSwitcher />
      </div>
    );
  };

  export default RegisterPage;