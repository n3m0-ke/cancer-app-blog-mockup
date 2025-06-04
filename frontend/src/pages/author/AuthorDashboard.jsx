import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../api';

export default function AuthorDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/author/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setStats(res.data);
        console.log(stats);
      } catch (err) {
        setError('Failed to load dashboard stats.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading dashboard...</div>;
  if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Welcome back!</h1>
        <p className="text-gray-600">Here’s how your content is doing.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-4 text-center">
          <h2 className="text-lg font-medium text-gray-700">Total Posts</h2>
          <p className="text-3xl font-bold text-indigo-600">{stats.total}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 text-center">
          <h2 className="text-lg font-medium text-gray-700">Published</h2>
          <p className="text-3xl font-bold text-green-600">{stats.published}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 text-center">
          <h2 className="text-lg font-medium text-gray-700">Drafts</h2>
          <p className="text-3xl font-bold text-yellow-500">{stats.draft}</p>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <a
          href="/author/new-post"
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          Create New Post
        </a>
        <a
          href="/author/my-posts"
          className="bg-gray-100 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-200 transition"
        >
          View My Posts
        </a>
      </div>
    </div>
  );
}
