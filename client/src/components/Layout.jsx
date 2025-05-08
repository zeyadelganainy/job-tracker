import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { userId, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col w-full">
      <header className="w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="flex justify-between items-center px-6 py-3 w-full">
          <h1 className="text-base font-semibold text-gray-800 tracking-tight pl-1">
            Job Tracker
          </h1>
          {userId && (
            <div className="flex justify-end">
              <button
                onClick={logout}
                
                className="logout-btn"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 w-full px-0">{children}</main>

      <footer className="w-full text-sm text-center text-gray-500 py-4 border-t mt-auto">
        &copy; {new Date().getFullYear()} Job Tracker App
      </footer>
    </div>
  );
};

export default Layout;
