import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPopper } from "@popperjs/core";

import image from "../../static/default_blog_image.jpg";

const UserDropdown = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Load user once on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        console.log("saved user: ", parsedUser);
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  // dropdown popper refs
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = useRef(null);
  const popoverDropdownRef = useRef(null);

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  // Wait for user to be loaded before rendering dropdown
  if (!user) return null;

  return (
    <li className="relative ml-3 mb-3 lg:mb-0" ref={userMenuRef}>
      <>
        <button
          onClick={() => setUserMenuOpen((prev) => !prev)}
          className="flex items-center gap-1 text-sm text-gray-700 font-medium px-0 py-0 rounded hover:bg-gray-100 transition"
        >
          <div className="items-center flex">
            <span className="w-8 h-8 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
              <img
                alt="avatar"
                className="w-8 h-8 rounded-full align-middle border-none shadow-lg"
                src={image}
              />
            </span>
            <span className="ml-1">{user.name || user.email}</span>
          </div>
          <i
            className={`fas fa-chevron-${
              userMenuOpen ? "up" : "down"
            } text-xs mt-1`}
          ></i>
        </button>

        {userMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-50">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
            >
              <i className="fas fa-sign-out-alt mr-2"></i> Logout
            </button>
          </div>
        )}
      </>
    </li>
  );
};

export default UserDropdown;
