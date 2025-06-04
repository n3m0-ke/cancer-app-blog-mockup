import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostModeration = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          'https://cancer-app-blog-mockup-backend.onrender.com/api/admin/posts',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPosts(res.data);
      } catch (err) {
        setError('Failed to load posts');
      }
    };

    fetchPosts();
  }, []);

  const toggleApproval = async (postId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `https://cancer-app-blog-mockup-backend.onrender.com/api/admin/posts/${postId}/approval`,
        { is_approved: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(prev =>
        prev.map(p =>
          p.id === postId ? { ...p, is_approved: !currentStatus } : p
        )
      );
    } catch (err) {
      alert('Error updating approval status');
    }
  };

  const deletePost = async postId => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `https://cancer-app-blog-mockup-backend.onrender.com/api/admin/posts/${postId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(prev => prev.filter(p => p.id !== postId));
    } catch (err) {
      alert('Error deleting post');
    }
  };

  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Post Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Author</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="p-2 border">{post.title}</td>
                <td className="p-2 border">{post.author_name}</td>
                <td className="p-2 border">
                  {post.is_approved ? 'Approved' : 'Pending'}
                </td>
                <td className="p-2 border space-y-1 flex flex-col items-center">
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => toggleApproval(post.id, post.is_approved)}
                  >
                    {post.is_approved ? 'Unapprove' : 'Approve'}
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => deletePost(post.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!posts.length && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostModeration;
