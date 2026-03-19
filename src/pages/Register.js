import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/tasks');
  }, [navigate]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setSubmitting(true);
      await axios.post(
        '/auth/api/register',
        { name, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };


  const focusBlue = (e) => (e.target.style.borderColor = '#0d6efd');
  const blurDark = (e) => (e.target.style.borderColor = '#212529');

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-sm p-4"
        style={{ width: '100%', maxWidth: 420 }}
      >

        <h3 className="text-center mb-3">Create your account</h3>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              className="form-control border border-dark"
              style={{ borderWidth: '2px', outline: 'none' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={focusBlue}
              onBlur={blurDark}
              required
              maxLength={80}
              placeholder="e.g. Alex Lee"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control border border-dark"
              style={{ borderWidth: '2px', outline: 'none' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={focusBlue}
              onBlur={blurDark}
              required
              placeholder="name@monash.edu"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control border border-dark"
              style={{ borderWidth: '2px', outline: 'none' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={focusBlue}
              onBlur={blurDark}
              required
              minLength={6}
              placeholder="At least 6 characters"
            />
          </div>

          <div className="mb-2">
            <label className="form-label" htmlFor="confirm">
              Confirm password
            </label>
            <input
              id="confirm"
              type="password"
              className="form-control border border-dark"
              style={{ borderWidth: '2px', outline: 'none' }}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              onFocus={focusBlue}
              onBlur={blurDark}
              required
            />
          </div>

          {error && <div className="alert alert-danger mt-2">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            disabled={submitting}
          >
            {submitting ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <div className="text-center my-3 text-muted">or</div>

        <a
          href="http://localhost:3001/auth/google"
          className="btn btn-outline-danger w-100"
        >
          Continue with Google
        </a>

        <div className="text-center mt-3">
          <small className="text-muted">
            Already have an account? <Link to="/login">Sign in</Link>
          </small>
        </div>
      </div>
    </div>
  );
}
