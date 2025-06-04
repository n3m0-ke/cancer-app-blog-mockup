import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await axios.post('https://cancer-app-blog-mockup-backend.onrender.com/api/auth/login', {
                email,
                password,
            });

            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Redirect based on role
            switch (user.role) {
                case 'admin':
                    navigate('/admin');
                    break;
                case 'author':
                    navigate('/author');
                    break;
                default:
                    navigate('/');
            }
        } catch (err) {
            console.error(err);
            setError('Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 mt-20 bg-white shadow-lg rounded">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            {error && (
                <div className="text-red-600 bg-red-100 px-4 py-2 rounded mb-4 transition-all duration-300">
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className={`w-full py-2 rounded text-white transition duration-300 ${
                        loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
