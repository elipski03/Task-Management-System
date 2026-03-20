import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthLinks() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center p-5">
              <h1 className="mb-4 fw-bold text-primary">
                Task Management System
              </h1>
              <p className="text-muted mb-4">
                Manage your club’s events, tasks, and schedules with ease.
              </p>
              <div className="d-grid gap-3">
                <a
                  href="/calendar"
                  className="btn btn-outline-secondary btn-lg"
                >
                  <i className="bi bi-calendar-event me-2"></i> Calendar
                </a>
                <a href="/tasks" className="btn btn-outline-secondary btn-lg">
                  <i className="bi bi-check2-square me-2"></i> Tasks
                </a>
                <button
                  onClick={handleLogout}
                  className="btn btn-danger btn-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
