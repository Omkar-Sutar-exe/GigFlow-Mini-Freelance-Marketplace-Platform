import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function MyGigsPage() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyGigs = async () => {
      try {
        const res = await api.get('/gigs/user');
        setGigs(res.data);
      } catch (error) {
        console.error('Error fetching my gigs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyGigs();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">My Posted Gigs</h2>
      {gigs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <div key={gig._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{gig.title}</h3>
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${gig.status === 'open' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  {gig.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">{gig.description}</p>
              <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                <span className="font-bold text-gray-800">${gig.budget}</span>
                <Link to={`/gig/${gig._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                  Manage Bids
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg mb-4">You haven't posted any gigs yet.</p>
          <Link to="/create-gig" className="text-blue-600 font-bold hover:underline">Post your first gig now →</Link>
        </div>
      )}
    </div>
  );
}

export default MyGigsPage;