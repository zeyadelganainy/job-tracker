import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { userId, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col w-full">
      <header className="w-full bg-white border-b border-gray-200 shadow-sm py-3 px-4 sm:px-8 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-800 tracking-tight">Job Tracker</h1>
        {userId && (
          <button
            onClick={logout}
            className="text-sm text-red-600 border border-red-500 px-3 py-1 rounded hover:bg-red-50"
          >
            Logout
          </button>
        )}
      </header>

      <main className="flex-1 w-full">{children}</main>

      <footer className="w-full text-sm text-center text-gray-500 py-4 border-t mt-auto">
        &copy; {new Date().getFullYear()} Job Tracker App
      </footer>
    </div>
  );
};

export default Layout;
