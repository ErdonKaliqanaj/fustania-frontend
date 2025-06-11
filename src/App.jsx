import i18n from "./i18n";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLayout from './components/layouts/AdminLayout';
import ClientLayout from './components/layouts/ClientLayout';
import DressesList from './pages/admin/DressesList';
import UsersList from './pages/admin/UsersList';
import Profile from './pages/client/Profile';
import ContactSeller from './pages/ContactSeller';
import DressDetail from './pages/DressDetail';
import DressList from './pages/DressList';
import Register from './pages/Register';
import { I18nextProvider } from "react-i18next";


function App(){
  return(
    <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          <Route element={<ClientLayout />}>
          <Route path="/" element={<h1>{i18n.t('home')}</h1>}/>
          <Route path="/dresses" element={<DressList/>}/>
          <Route path="/dresses/:id" element={<DressDetail/>}/>
          <Route path="/dresses/:id/contact" element={<ContactSeller/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="profile" element={<Profile/>}/>
          </Route>
          <Route element={<AdminLayout/>}>
          <Route path="/admin/users" element={<UsersList/>}/>
          <Route path="/admin/dresses" element={<DressesList/>}/>
          </Route>
        </Routes>
      </Router>
    </I18nextProvider>
  )
}


export default App;
