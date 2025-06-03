import { useEffect, useState } from 'react';
import { getPosts } from '../api';

import PostCard from "./Postcard";
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import defaultImage from "../static/default_blog_image.jpg";

const BlogMainSection = () => {
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
        <section className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Posts */}
            <div className="lg:col-span-8 space-y-6">
                <h2 className="text-2xl font-bold mb-4">Top Posts</h2>
                {posts.length === 0 ?
                    (<p className="text-gray-600">No posts yet.</p>) :
                    (posts.map((post) => (<PostCard key={post.slug} post={post} />)))
                }

                {/* {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))} */}
            </div>

            {/* Right: Sidebar */}
            <aside className="lg:col-span-4">
                <div className="sticky top-[80px]">
                    <div className="bg-white shadow rounded p-4 mb-6">
                        <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                        <ul className="space-y-2 text-blue-600 text-sm">
                            <li><a href="#" className="hover:underline">About the Blog</a></li>
                            <li><a href="#" className="hover:underline">Latest Posts</a></li>
                            <li><a href="#" className="hover:underline">Contact</a></li>
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div className="bg-white shadow rounded p-4">
                        <h3 className="text-lg font-semibold mb-2">Sponsored</h3>
                        <img
                            src={defaultImage}
                            alt="Ad"
                            className="rounded w-full object-cover h-40"
                        />
                    </div>
                </div>
            </aside>
        </section>
    );
};

export default BlogMainSection;
