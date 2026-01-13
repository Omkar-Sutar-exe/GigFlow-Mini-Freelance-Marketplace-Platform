import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth(); // Use the auth context
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">GigPlatform</Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/create-gig" className="text-gray-300 hover:text-white">Post Gig</Link>
              <Link to="/my-gigs" className="text-gray-300 hover:text-white">My Gigs</Link>
              <Link to="/my-bids" className="text-gray-300 hover:text-white">My Bids</Link>
              <span className="text-white">Welcome, {user?.name}</span> {/* Use optional chaining */}
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
              <Link to="/register" className="text-gray-300 hover:text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;