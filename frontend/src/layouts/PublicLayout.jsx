// src/components/PublicLayout.jsx
import Navbar from '../components/IndexNavbar';
import Footer from '../components/IndexFooter';
import { Outlet } from 'react-router-dom';

const PublicLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Navbar />
            <main className="w-full mx-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
