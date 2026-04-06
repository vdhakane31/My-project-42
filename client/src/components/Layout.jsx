import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-slate-900 text-white shadow">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link className="font-semibold tracking-wide" to="/">
            Smart Placement Predictor
          </Link>
          <div className="flex items-center gap-3 text-sm">
            {isAuthenticated ? (
              <>
                <span className="rounded bg-slate-700 px-2 py-1 capitalize">{user?.role}</span>
                <button className="rounded bg-rose-500 px-3 py-1 hover:bg-rose-600" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <Link className="rounded bg-indigo-500 px-3 py-1 hover:bg-indigo-600" to="/login-selection">
                Login
              </Link>
            )}
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
};

export default Layout;
