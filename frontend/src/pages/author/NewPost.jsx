import { useState } from 'react';
import { API } from '../../api';
import { useNavigate } from 'react-router-dom';

export default function NewPost() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState('draft');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token'); // Adjust if using cookies or context

            const res = await API.post(
                '/author/posts',
                {
                    title,
                    content: body,
                    status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccess('Post created successfully!');
            setTimeout(() => navigate('/author/my-posts'), 1200);
        } catch (err) {
            console.error(err);
            setError(err?.response?.data?.error || 'Failed to create post');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">Create New Post</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow">
                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}

                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Body</label>
                    <textarea
                        rows="8"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="draft">Save as Draft</option>
                        <option value="pending">Submit for Review</option>
                    </select>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Post'}
                    </button>
                </div>
            </form>
        </div>
    );
}
