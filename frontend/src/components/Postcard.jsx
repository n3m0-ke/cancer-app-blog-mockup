import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow rounded p-4 hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-blue-600 mb-1">
        <Link to={`/post/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="text-sm text-gray-500 mb-2">
        Published on {new Date(post.published_at).toLocaleDateString()}
      </p>
      <p className="text-gray-700 line-clamp-3">
        {post.content.length > 200
          ? `${post.content.substring(0, 200)}...`
          : post.content}
      </p>
      <Link
        to={`/post/${post.slug}`}
        className="text-blue-500 text-sm font-medium inline-block mt-2 hover:underline"
      >
        Read more →
      </Link>
    </div>
  );
};

export default PostCard;
