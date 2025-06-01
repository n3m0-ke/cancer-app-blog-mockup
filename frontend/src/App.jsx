import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import LoginPage from './pages/LoginPage';
import PublicLayout from './components/PublicLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes with layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<PostDetails />} />
        </Route>

        {/* Auth route outside layout */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
