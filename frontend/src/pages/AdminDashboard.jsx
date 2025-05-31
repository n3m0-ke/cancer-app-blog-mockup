import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const fetchStatsAndUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const [statsRes, usersRes] = await Promise.all([
          axios.get('https://cancer-app-blog-mockup-backend.onrender.com/api/admin/dashboard', { headers }),
          axios.get('https://cancer-app-blog-mockup-backend.onrender.com/api/admin/users', { headers }),
        ]);

        setStats(statsRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        setError('Access denied or unauthorized.');
      }
    };

    fetchStatsAndUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `https://cancer-app-blog-mockup-backend.onrender.com/api/admin/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users =>
        users.map(u => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      alert('Error updating role');
    }
  };

  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const newStatus = !currentStatus;
      await axios.patch(
        `https://cancer-app-blog-mockup-backend.onrender.com/api/admin/users/${userId}/status`,
        { is_active: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users =>
        users.map(u => (u.id === userId ? { ...u, is_active: newStatus } : u))
      );
    } catch (err) {
      alert('Error updating user status');
    }
  };

  if (error) return <div className="text-red-600">{error}</div>;
  if (!stats) return <div>Loading dashboard...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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

      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-2">User Management</h2>
        <table className="w-full table-auto border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-2 py-1 border">Name</th>
              <th className="px-2 py-1 border">Email</th>
              <th className="px-2 py-1 border">Role</th>
              <th className="px-2 py-1 border">Status</th>
              <th className="px-2 py-1 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="text-center">
                <td className="border px-2 py-1">{user.name}</td>
                <td className="border px-2 py-1">{user.email}</td>
                <td className="border px-2 py-1">{user.role}</td>
                <td className="border px-2 py-1">
                  {user.is_active ? 'Active' : 'Inactive'}
                </td>
                <td className="border px-2 py-1 space-y-1 flex flex-col items-center">
                  {user.role !== 'admin' && (
                    <button
                      className="text-blue-600 underline"
                      onClick={() => handleRoleChange(user.id, 'admin')}
                    >
                      Promote to Admin
                    </button>
                  )}
                  {user.role !== 'user' && (
                    <button
                      className="text-yellow-600 underline"
                      onClick={() => handleRoleChange(user.id, 'user')}
                    >
                      Demote to User
                    </button>
                  )}
                  <button
                    className="text-purple-600 underline"
                    onClick={() => handleStatusToggle(user.id, user.is_active)}
                  >
                    {user.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
