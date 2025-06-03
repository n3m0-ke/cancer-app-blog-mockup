// src/layouts/AuthorLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AuthorLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow p-4">
        <h2 className="text-xl font-bold mb-4">Author Panel</h2>
        <nav className="space-y-2">
          <NavLink to="/author" className="block hover:underline">Dashboard</NavLink>
          <NavLink to="/author/posts" className="block hover:underline">My Posts</NavLink>
          {/* Add more author links as needed */}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthorLayout;
