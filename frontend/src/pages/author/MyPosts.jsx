import { useEffect, useState } from 'react';
import { API } from '../../api';
import PostCard from '../../components/authorComponents/PostCard';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get('/author/posts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load your posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [token]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">My Posts</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && posts.length === 0 && <p className="text-gray-600">No posts yet.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onPostUpdate={setPosts} />
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
