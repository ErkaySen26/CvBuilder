import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
const App = () => {
    return (_jsxs(Router, { children: [_jsx(Navbar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: "/templates", element: _jsx(TemplatesPage, {}) }), _jsx(Route, { path: "/preview/:id", element: _jsx(TemplatePreviewPage, {}) })] }), _jsx(ChatBot, {})] }));
};
export default App;
