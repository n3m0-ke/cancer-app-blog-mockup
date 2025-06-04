import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentModeration = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          'https://cancer-app-blog-mockup-backend.onrender.com/api/admin/comments',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setComments(res.data);
      } catch (err) {
        setError('Failed to fetch comments');
      }
    };

    fetchComments();
  }, []);

  const toggleApproval = async (commentId, isApproved) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `https://cancer-app-blog-mockup-backend.onrender.com/api/admin/comments/${commentId}/approval`,
        { is_approved: !isApproved },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(prev =>
        prev.map(c =>
          c.id === commentId ? { ...c, is_approved: !isApproved } : c
        )
      );
    } catch (err) {
      alert('Error updating comment status');
    }
  };

  const deleteComment = async commentId => {
    if (!window.confirm('Delete this comment?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `https://cancer-app-blog-mockup-backend.onrender.com/api/admin/comments/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {
      alert('Error deleting comment');
    }
  };

  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Comment Moderation</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Comment</th>
              <th className="p-2 border">Author</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map(comment => (
              <tr key={comment.id} className="hover:bg-gray-50">
                <td className="p-2 border">{comment.text}</td>
                <td className="p-2 border">{comment.author_name}</td>
                <td className="p-2 border">
                  {comment.is_approved ? 'Approved' : 'Pending'}
                </td>
                <td className="p-2 border flex flex-col space-y-1 items-center">
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() =>
                      toggleApproval(comment.id, comment.is_approved)
                    }
                  >
                    {comment.is_approved ? 'Unapprove' : 'Approve'}
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => deleteComment(comment.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!comments.length && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No comments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentModeration;
