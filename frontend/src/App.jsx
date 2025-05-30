import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:slug" element={<PostDetails />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </Router>
);

export default App;
