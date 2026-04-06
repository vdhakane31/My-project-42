import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const StudentAuthPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isRegisterMode, setRegisterMode] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const endpoint = isRegisterMode ? '/auth/register' : '/auth/login';
      const payload = { ...form, role: 'student' };
      const response = await api.post(endpoint, payload);

      if (!isRegisterMode) {
        login(response.data);
        navigate('/student-dashboard');
      } else {
        setRegisterMode(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <section className="mx-auto max-w-md rounded-xl bg-white p-8 shadow">
      <h2 className="text-2xl font-semibold">{isRegisterMode ? 'Student Register' : 'Student Login'}</h2>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <input
          required
          className="w-full rounded border p-3"
          placeholder="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          required
          className="w-full rounded border p-3"
          placeholder="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button className="w-full rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700" type="submit">
          {isRegisterMode ? 'Create Account' : 'Login'}
        </button>
      </form>
      <button className="mt-4 text-sm text-indigo-600" onClick={() => setRegisterMode((prev) => !prev)}>
        {isRegisterMode ? 'Already registered? Login' : 'Need account? Register'}
      </button>
    </section>
  );
};

export default StudentAuthPage;
