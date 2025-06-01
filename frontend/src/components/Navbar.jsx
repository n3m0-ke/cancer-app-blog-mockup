// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        Cancer Blog
      </Link>

      <div className="flex gap-4 items-center">
        {!user ? (
          <>
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            {/* Optional: <Link to="/register">Register</Link> */}
          </>
        ) : (
          <>
            {user.role === 'admin' && (
              <Link to="/admin" className="text-blue-600 hover:underline">Admin Panel</Link>
            )}
            {user.role === 'author' && (
              <Link to="/author" className="text-blue-600 hover:underline">Author Panel</Link>
            )}
            <span className="text-gray-600">Hi, {user.name || user.email}</span>
            <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
