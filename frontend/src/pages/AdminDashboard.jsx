import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        setError('Access denied or unauthorized.');
      }
    };

    fetchStats();
  }, []);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!stats) return <div>Loading dashboard...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">Users: {stats.totalUsers}</div>
        <div className="bg-white p-4 shadow rounded">Posts: {stats.totalPosts}</div>
        <div className="bg-white p-4 shadow rounded">Comments: {stats.totalComments}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;