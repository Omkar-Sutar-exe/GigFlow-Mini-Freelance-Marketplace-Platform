import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function HomePage() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchGigs = async (query = '') => {
    try {
      setLoading(true);
      const res = await api.get(`/gigs?search=${query}`);
      setGigs(res.data);
    } catch (error) {
      console.error('Error fetching gigs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchGigs(search);
  };

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Available Gigs</h2>
        <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-2">
          <input
            type="text"
            placeholder="Search gigs..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.length > 0 ? (
            gigs.map((gig) => (
              <div key={gig._id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{gig.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{gig.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-green-600 font-bold text-lg">${gig.budget}</span>
                  <Link
                    to={`/gig/${gig._id}`}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-10 text-lg">No gigs found matching your criteria.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
// import React from 'react';

// function HomePage() {
//   return (
//     <div className="text-center py-8">
//       <h2 className="text-3xl font-bold text-gray-800">Welcome to the Gig Platform!</h2>
//       <p className="mt-4 text-lg text-gray-600">Explore available gigs or post your own.</p>
//     </div>
//   );
// }

// export default HomePage;