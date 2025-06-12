import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import ClientProfile from './pages/ClientProfile';
import AdminDashboard from './pages/AdminDashboard';
import Dresses from './pages/Dresses';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ClientProfile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dresses" element={<Dresses />} />
        <Route path="/" element={<Dresses />} />
      </Routes>
    </Router>
  );
}

export default App;
