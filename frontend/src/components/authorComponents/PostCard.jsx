import { useState } from 'react';
import { API } from '../../api';

const PostCard = ({ post, onPostUpdate }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [status, setStatus] = useState(post.status);
  const token = localStorage.getItem('token');

  const handleUpdate = async () => {
    try {
      const res = await API.put(`/author/posts/${post.id}`, { title, content, status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsEditOpen(false);
      // Optionally re-fetch all posts or update locally
      const updatedRes = await API.get('/author/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      onPostUpdate(updatedRes.data);
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/author/posts/${post.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsConfirmOpen(false);
      const updatedRes = await API.get('/author/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      onPostUpdate(updatedRes.data);
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white space-y-2">
      <h3 className="text-xl font-medium">{post.title}</h3>
      <p className="text-sm text-gray-500">Status: {post.status}</p>
      <p className="line-clamp-3 text-gray-700">{post.content}</p>

      <div className="flex gap-2 mt-3">
        <button
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
          onClick={() => setIsEditOpen(true)}
        >
          Edit
        </button>
        <button
          disabled={post.status !== 'draft'}
          className={`px-3 py-1 rounded text-white ${
            post.status === 'draft'
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={() => setIsConfirmOpen(true)}
        >
          Delete
        </button>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Title"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Content"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this post?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
