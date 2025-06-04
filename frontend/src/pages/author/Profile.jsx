import React, { useState, useEffect } from 'react';
import { API } from '../../api';

const AuthorProfile = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/author/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(res.data);
      } catch (err) {
        setError('Failed to load profile.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setUpdating(true);
    setMessage('');
    setError('');
    try {
      await API.put('/author/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Profile updated successfully.');
    } catch (err) {
      setError('Failed to update profile.');
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded px-3 py-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded px-3 py-2"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={updating}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {updating ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default AuthorProfile;
