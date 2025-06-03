import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import LoginPage from './pages/LoginPage';
import PublicLayout from './layouts/PublicLayout';

import AuthorLayout from './layouts/AuthorLayout';
import AuthorDashboard from './pages/author/AuthorDashboard';

import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import CommentModeration from './pages/admin/CommentModeration';
import PostModeration from './pages/admin/PostModeration';
import Profile from './pages/admin/Profile';
import UserManagement from './pages/admin/UserManagement';

import ProtectedRoute from './components/ProtectedRoute';

import Test from './pages/TestPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<PostDetails />} />
        </Route>

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<Test />} />

        {/* Admin Routes (protected) */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="post-moderation" element={<PostModeration />} />
            <Route path="comment-moderation" element={<CommentModeration />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Author Routes (protected) */}
        <Route element={<ProtectedRoute allowedRoles={['author']} />}>
          <Route path="/author" element={<AuthorLayout />}>
            <Route index element={<AuthorDashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
