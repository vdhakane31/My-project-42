import { Link } from 'react-router-dom';

const LandingPage = () => (
  <section className="flex min-h-[70vh] flex-col items-center justify-center rounded-xl bg-white p-10 text-center shadow">
    <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">Smart Placement Predictor</h1>
    <p className="mt-4 max-w-2xl text-slate-600">
      Predict placement outcomes from academics, skills, and resume insights. Built for students and TPO teams.
    </p>
    <Link
      to="/login-selection"
      className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
    >
      Get Started
    </Link>
  </section>
);

export default LandingPage;
