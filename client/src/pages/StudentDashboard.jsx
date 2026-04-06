import { useState } from 'react';
import PredictionChart from '../components/PredictionChart';
import Spinner from '../components/Spinner';
import api from '../services/api';

const defaultForm = {
  name: '',
  branch: '',
  skills: '',
  aptitudeScore: '',
  communicationSkills: '',
  internshipExperience: 'No',
  resume: null
};

const StudentDashboard = () => {
  const [form, setForm] = useState(defaultForm);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => payload.append(key, value));
      const response = await api.post('/predict', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setPrediction(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-xl bg-white p-6 shadow">
        <h2 className="text-2xl font-semibold">Student Profile</h2>
        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <input className="w-full rounded border p-2" placeholder="Name" required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          <input className="w-full rounded border p-2" placeholder="Branch" required value={form.branch} onChange={(e) => setForm((p) => ({ ...p, branch: e.target.value }))} />
          <input className="w-full rounded border p-2" placeholder="Skills (comma separated)" required value={form.skills} onChange={(e) => setForm((p) => ({ ...p, skills: e.target.value }))} />
          <input className="w-full rounded border p-2" type="number" min="0" max="100" placeholder="Aptitude Score" required value={form.aptitudeScore} onChange={(e) => setForm((p) => ({ ...p, aptitudeScore: e.target.value }))} />
          <input className="w-full rounded border p-2" type="number" min="1" max="10" placeholder="Communication Skills (1-10)" required value={form.communicationSkills} onChange={(e) => setForm((p) => ({ ...p, communicationSkills: e.target.value }))} />
          <select className="w-full rounded border p-2" value={form.internshipExperience} onChange={(e) => setForm((p) => ({ ...p, internshipExperience: e.target.value }))}>
            <option>Yes</option>
            <option>No</option>
          </select>
          <input className="w-full rounded border p-2" type="file" accept="application/pdf" required onChange={(e) => setForm((p) => ({ ...p, resume: e.target.files?.[0] || null }))} />
          <button className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700" type="submit">
            Submit for Prediction
          </button>
        </form>
      </section>

      <section className="rounded-xl bg-white p-6 shadow">
        <h2 className="text-2xl font-semibold">Prediction Result</h2>
        {loading && <Spinner />}
        {error && <p className="mt-4 text-rose-600">{error}</p>}

        {prediction && (
          <div className="mt-4 space-y-4">
            <p className="text-lg font-medium">
              Placement Prediction: <span className="text-indigo-700">{prediction.status}</span>
            </p>
            <p>Confidence: {prediction.confidence.toFixed(2)}%</p>
            <PredictionChart confidence={prediction.confidence} />
            <div>
              <h3 className="font-semibold">Suggestions</h3>
              <ul className="list-disc pl-5 text-sm text-slate-700">
                {prediction.suggestions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Missing Resume Skills</h3>
              <p className="text-sm text-slate-700">{prediction.missingSkills?.join(', ') || 'None'}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default StudentDashboard;
