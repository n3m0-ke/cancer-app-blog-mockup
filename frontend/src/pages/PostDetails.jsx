import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const PostDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, commentRes] = await Promise.all([
          axios.get(`https://cancer-app-blog-mockup-backend.onrender.com/api/posts/${slug}`),
          axios.get(`https://cancer-app-blog-mockup-backend.onrender.com/api/comments/post/${slug}`)
        ]);
        setPost(postRes.data);
        setComments(commentRes.data);
      } catch (err) {
        console.error('Failed to load post or comments', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setCommentSubmitting(true);
      await axios.post(`https://cancer-app-blog-mockup-backend.onrender.com/api/comments/`, {
        slug,
        content: newComment,
        user_id: null, // Placeholder for future enhancement
      });

      setNewComment('');
      const updated = await axios.get(
        `https://cancer-app-blog-mockup-backend.onrender.com/api/comments/post/${slug}`
      );
      setComments(updated.data);
    } catch (err) {
      console.error('Failed to post comment:', err);
    } finally {
      setCommentSubmitting(false);
    }
  };

  if (loading) return <Loading message="Loading post..." />;
    if (!post) return <ErrorMessage message="Post not found." />;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-sm">
      <article className="prose max-w-none prose-lg">
        <h1>{post.title}</h1>
        <p className="text-sm text-gray-500 -mt-4 mb-6">
          Published on {new Date(post.published_at).toLocaleDateString()}
        </p>
        <div>{post.content}</div>
      </article>

      {/* Comments Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>

        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            className="w-full border rounded p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Leave a comment..."
            rows="3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded disabled:opacity-50"
            disabled={commentSubmitting}
          >
            {commentSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-600">No comments yet. Be the first!</p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="border rounded p-3 bg-gray-50 shadow-sm"
              >
                <p className="text-gray-800 mb-1">{comment.content}</p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default PostDetails;