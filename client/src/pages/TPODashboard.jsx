import { useState } from 'react';
import api from '../services/api';

const TPODashboard = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpload = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!file) {
      setError('Please choose a CSV file.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(response.data.message || 'File uploaded and model trained.');
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <section className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow">
      <h2 className="text-2xl font-semibold">TPO Dashboard</h2>
      <p className="mt-2 text-sm text-slate-600">
        Upload historical placement data CSV to retrain the predictor model.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleUpload}>
        <input
          className="w-full rounded border p-3"
          type="file"
          accept=".csv"
          onChange={(event) => setFile(event.target.files?.[0] || null)}
        />
        <button className="rounded bg-slate-900 px-5 py-2 text-white hover:bg-slate-950" type="submit">
          Upload CSV
        </button>
      </form>

      {message && <p className="mt-4 text-emerald-700">{message}</p>}
      {error && <p className="mt-4 text-rose-600">{error}</p>}
    </section>
  );
};

export default TPODashboard;
