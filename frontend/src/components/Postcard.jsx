import { Link } from "react-router-dom";

const PostCard = ({ post }) => (
    <Link to={`/posts/${post.slug}`}>
        <div className="border p-4 rounded shadow hover:shadow-md transition">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.content.slice(0, 100)}...</p>
        </div>
    </Link>
);

export default PostCard;
