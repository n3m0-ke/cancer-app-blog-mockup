import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('https://cancer-app-blog-mockup-backend.onrender.com/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Optional: Redirect to admin dashboard if user is admin
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
        console.log(err);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;