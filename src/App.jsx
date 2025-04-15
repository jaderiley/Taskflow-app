import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';
import './App.css';

function App() {
  return (
    <Router>
      
      <Routes>
        {/* Default route to Login */}
        <Route path="/" element={<LoginForm />} />
        {/* Add other routes here */}
        <Route path="/Register" element={<RegisterForm />} />
        {/* Add more routes as needed */}
        <Route path="Register/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;