import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-center">
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
      </div>
    </header>
  );
}