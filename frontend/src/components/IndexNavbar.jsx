// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import React from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-6 py-4 navbar-expand-lg bg-white bg-opacity-80 shadow">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <Link to="/" className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase">
                        Cancer Blog
                    </Link>
                    <button
                        className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                        type="button"
                        onClick={() => setNavbarOpen(!navbarOpen)}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                </div>

                <div
                    className={
                        "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
                        (navbarOpen ? " block" : " hidden")
                    }
                    id="example-navbar-warning"
                >
                    <ul className="flex flex-col lg:flex-row list-none mr-auto">
                        <li className="flex items-center">
                            <a
                                className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                                href="https://www.facebook.com/"
                                target="_blank"
                            >
                                <i className="text-blueGray-400 fab fa-facebook text-lg leading-lg " />
                                <span className="lg:hidden inline-block ml-2">Share</span>
                            </a>
                        </li>

                        <li className="flex items-center">
                            <a
                                className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                                href="https://twitter.com/"
                                target="_blank"
                            >
                                <i className="text-blueGray-400 fab fa-twitter text-lg leading-lg " />
                                <span className="lg:hidden inline-block ml-2">Tweet</span>
                            </a>
                        </li>

                        <li className="flex items-center">
                            <a
                                className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                                href="https://github.com/"
                                target="_blank"
                            >
                                <i className="text-blueGray-400 fab fa-github text-lg leading-lg " />
                                <span className="lg:hidden inline-block ml-2">Star</span>
                            </a>
                        </li>
                    </ul>
                    <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                        <li className="flex items-center">
                            {/* <IndexDropdown /> */}
                        </li>


                        <li className="relative ml-3 mb-3 lg:mb-0" ref={userMenuRef}>
                            {!user ? (
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded hover:bg-gray-100 transition"
                                >
                                    <i className="fas fa-sign-in-alt"></i> Login
                                </Link>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setUserMenuOpen((prev) => !prev)}
                                        className="flex items-center gap-2 text-sm text-gray-700 font-medium px-4 py-2 rounded hover:bg-gray-100 transition"
                                    >
                                        <i className="fas fa-user-circle text-lg"></i>
                                        {user.name || user.email}
                                        <i className={`fas fa-chevron-${userMenuOpen ? 'up' : 'down'} text-xs mt-1`}></i>
                                    </button>

                                    {userMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-50">
                                            {user.role === 'admin' && (
                                                <Link
                                                    to="/admin"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    <i className="fas fa-tools mr-2"></i> Admin Panel
                                                </Link>
                                            )}
                                            {user.role === 'author' && (
                                                <Link
                                                    to="/author"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    <i className="fas fa-pen-nib mr-2"></i> Author Panel
                                                </Link>
                                            )}
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                            >
                                                <i className="fas fa-sign-out-alt mr-2"></i> Logout
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
