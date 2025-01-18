import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/notes" className="text-white hover:text-gray-400">Home</Link>
          </li>
          <li>
            <Link to="/category" className="text-white hover:text-gray-400">Category</Link>
          </li>
          <li>
            <Link to="/profile" className="text-white hover:text-gray-400">Profile</Link>
          </li>
        </ul>
        <form onSubmit={handleSearch} className="flex space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="p-2 rounded-md"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Search
          </button>
        </form>
        {/* Logout Button */}
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 ml-4">
          Logout
        </button>
      </div>
    </header>
  );
}