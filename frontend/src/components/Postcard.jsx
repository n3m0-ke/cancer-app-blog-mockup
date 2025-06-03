import { Link } from 'react-router-dom';
import defaultImage from '../static/default_blog_image.jpg';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition duration-300 overflow-hidden">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image || defaultImage}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      </Link>

      <div className="p-4">
        <h2 className="text-xl font-semibold text-blue-600 hover:underline line-clamp-2">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="text-sm text-gray-500 mt-1 mb-2">
          Published on {new Date(post.published_at).toLocaleDateString()}
        </p>

        <p className="text-gray-700 text-sm line-clamp-3">
          {post.content.length > 200
            ? `${post.content.substring(0, 200)}...`
            : post.content}
        </p>

        <Link
          to={`/post/${post.slug}`}
          className="text-blue-500 text-sm font-medium inline-block mt-3 hover:underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;