import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import Navbar from './components/Navbar/Navbar';
import { HomePage } from "./pages/HomePage";
import ProfilePage from './pages/ProfilePage';
import TemplatesPage from './pages/TemplatesPage';
import TemplatePreviewPage from './templates/TemplatePreviewPage';
import ChatBot from './components/ChatBot/ChatBot';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/templates" element={<TemplatesPage />} />

        <Route path="/preview/:id" element={<TemplatePreviewPage />} />
        {/* diğer sayfalar */}
      </Routes>
      <ChatBot />
    </Router>

  );
};

export default App;
