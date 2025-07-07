import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientLayout from './layouts/ClientLayout';
import Dresses from './pages/Dresses';
import DressDetails from './pages/DressDetails';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Dresses />} />
          <Route path="/dresses" element={<Dresses />} />
          <Route path="/dresses/:id" element={<DressDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;