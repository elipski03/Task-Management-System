import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/dashboard');
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/auth/api/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.setItem('token', res.data.token);
      alert('Login Succesful!');
      navigate('/dashboard');
    } catch (error) {
      alert('Login Failed!');
    }
  };

  return (
    <div className="container my-5">
      {/* Back button in top-left */}
      <div className="mb-3">
        {/* <a href="/dashboard" className="btn btn-outline-secondary">
          ← Back to Dashboard
        </a> */}
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <h2 className="mb-4 text-center text-primary fw-bold">
                Welcome Back
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="you@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <p className="mt-2 mb-0">
                    <a href="/forgot-password" className="text-decoration-none">
                      Forgot your password?
                    </a>
                  </p>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>

              <hr />

              <a
                href="http://localhost:3001/auth/google"
                className="btn btn-outline-dark w-100"
              >
                Continue with Google
              </a>

              <p className="mt-3 mb-0 text-center">
                Don’t have an account?{' '}
                <a href="/register" className="text-decoration-none">
                  Register here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
