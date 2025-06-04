import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(
          'https://cancer-app-blog-mockup-backend.onrender.com/api/admin/users',
          { headers }
        );
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users.');
      }
    };

    fetchUsers();
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

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="text-center hover:bg-gray-50">
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border">
                  {user.is_active ? 'Active' : 'Inactive'}
                </td>
                <td className="p-2 border space-y-1 flex flex-col items-center">
                  {user.role !== 'admin' && (
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleRoleChange(user.id, 'admin')}
                    >
                      Promote to Admin
                    </button>
                  )}
                  {user.role !== 'user' && (
                    <button
                      className="text-yellow-600 hover:underline"
                      onClick={() => handleRoleChange(user.id, 'user')}
                    >
                      Demote to User
                    </button>
                  )}
                  <button
                    className="text-purple-600 hover:underline"
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

export default UserManagement;
