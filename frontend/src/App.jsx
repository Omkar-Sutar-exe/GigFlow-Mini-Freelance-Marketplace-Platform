import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateGigPage from './pages/CreateGigPage';
import GigDetailsPage from './pages/GigDetailsPage';
import MyGigsPage from './pages/MyGigsPage';
import MyBidsPage from './pages/MyBidsPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create-gig" element={<CreateGigPage />} />
          <Route path="/gig/:id" element={<GigDetailsPage />} />
          <Route path="/my-gigs" element={<MyGigsPage />} />
          <Route path="/my-bids" element={<MyBidsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;