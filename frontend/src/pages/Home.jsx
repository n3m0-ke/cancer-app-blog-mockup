import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import PostCard from '../components/Postcard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Hero from '../components/IndexHero';
import BlogMainSection from '../components/IndexMainSection';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPosts()
      .then(res => setPosts(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to load posts. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Loading posts..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
    <Hero />
    <div className="p-6">
      {/* {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        <div className="grid gap-4">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )} */}

      <BlogMainSection />
    </div>
    </>
  );
};

export default Home;
