import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function MyBidsPage() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBids = async () => {
      try {
        const res = await api.get('/bids/user');
        setBids(res.data);
      } catch (error) {
        console.error('Error fetching my bids:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBids();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">My Submitted Bids</h2>
      {bids.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Gig Title</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Bid Amount</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {bids.map((bid) => (
                <tr key={bid._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold text-gray-800">{bid.gigId.title}</td>
                  <td className="px-6 py-4 font-bold text-green-600">${bid.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      bid.status === 'hired' ? 'bg-green-100 text-green-600' : 
                      bid.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {bid.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/gig/${bid.gigId._id}`} className="text-blue-600 font-bold hover:underline">View Gig</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg mb-4">You haven't placed any bids yet.</p>
          <Link to="/" className="text-blue-600 font-bold hover:underline">Browse available gigs →</Link>
        </div>
      )}
    </div>
  );
}

export default MyBidsPage;