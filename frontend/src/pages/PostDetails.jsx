import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PostDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/api/posts/${slug}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));

    axios.get(`http://localhost:3000/api/comments/post/${slug}`)
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await axios.post(`http://localhost:3000/api/comments/`, {
        slug,
        content: newComment,
        user_id: null // placeholder; later this could be logged-in user
      });
      setNewComment('');
      // Refresh comments
      const res = await axios.get(`http://localhost:3000/api/comments/post/${slug}`);
      setComments(res.data);
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  };

  if (!post) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-4">Published on {new Date(post.published_at).toLocaleDateString()}</p>
      <div className="prose max-w-none">{post.content}</div>

      {/* Comments Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Comments</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            className="w-full border rounded p-2 mb-2"
            placeholder="Leave a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>

        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="border rounded p-2">
              <p>{comment.content}</p>
              <p className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default PostDetails;
