// src/components/PublicLayout.jsx
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const PublicLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Navbar />
            <main className="max-w-4xl mx-auto p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default PublicLayout;
