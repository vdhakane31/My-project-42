import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const TPOLoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', { ...form, role: 'tpo' });
      login(response.data);
      navigate('/tpo-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <section className="mx-auto max-w-md rounded-xl bg-white p-8 shadow">
      <h2 className="text-2xl font-semibold">TPO Login</h2>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <input
          required
          className="w-full rounded border p-3"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        />
        <input
          required
          className="w-full rounded border p-3"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
        />
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button className="w-full rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-950" type="submit">
          Login
        </button>
      </form>
    </section>
  );
};

export default TPOLoginPage;
