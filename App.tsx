
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <HashRouter>
      <div className="bg-slate-900 min-h-screen text-white font-sans">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
