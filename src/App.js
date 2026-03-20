import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import AuthSuccess from './pages/AuthSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        {/* Optional: add a 404 NotFound page route here */}
      </Routes>
    </Router>
  );
}

export default App;
