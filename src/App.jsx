import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/Login';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route to Login */}
        <Route path="/" element={<LoginForm />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;