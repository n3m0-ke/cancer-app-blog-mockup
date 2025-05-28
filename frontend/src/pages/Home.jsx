import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import PostCard from '../components/Postcard';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Latest Posts</h1>
      <div className="grid gap-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
