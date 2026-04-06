import { Link } from 'react-router-dom';

const LoginSelectionPage = () => (
  <section className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow">
    <h2 className="text-center text-2xl font-semibold">Choose Login Type</h2>
    <div className="mt-8 grid gap-4">
      <Link to="/student-auth" className="rounded bg-indigo-600 px-4 py-3 text-center font-medium text-white hover:bg-indigo-700">
        Student Login
      </Link>
      <Link to="/tpo-login" className="rounded bg-slate-800 px-4 py-3 text-center font-medium text-white hover:bg-slate-900">
        TPO Login
      </Link>
    </div>
  </section>
);

export default LoginSelectionPage;
