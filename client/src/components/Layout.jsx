import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { userId, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Job Tracker</h1>
        <nav>
          {userId ? (
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-blue-600 px-3 py-1 rounded">Login</Link>
          )}
        </nav>
      </header>

      <main className="flex-1 p-6">{children}</main>

      <footer className="bg-gray-200 text-center text-sm text-gray-600 py-4 mt-auto">
        &copy; {new Date().getFullYear()} Job Tracker. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
