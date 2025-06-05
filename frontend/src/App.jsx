import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]); // Centralized state for tasks

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]); // Add the new task to the tasks array
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard tasks={tasks} />} /> {/* Pass tasks */}
        <Route path="/create-task" element={<CreateTask />} />
      </Routes>
    </Router>
  );
}

export default App;