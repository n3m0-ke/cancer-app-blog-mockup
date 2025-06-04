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
        const headers = { Authorization: `Bearer ${token}` };

        const res = await axios.get(
          'https://cancer-app-blog-mockup-backend.onrender.com/api/admin/dashboard',
          { headers }
        );

        setStats(res.data);
      } catch (err) {
        console.log('error: ', err);
        setError('Access denied or unauthorized.');
      }
    };

    fetchStats();
  }, []);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!stats) return <div className="text-gray-600">Loading dashboard...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
          <p className="text-gray-500 text-sm">Total Users</p>
          <p className="text-3xl font-semibold">{stats.totalUsers}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
          <p className="text-gray-500 text-sm">Total Posts</p>
          <p className="text-3xl font-semibold">{stats.totalPosts}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
          <p className="text-gray-500 text-sm">Total Comments</p>
          <p className="text-3xl font-semibold">{stats.totalComments}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
