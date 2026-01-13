import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

function GigDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bidFormData, setBidFormData] = useState({ message: '', price: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isOwner = user && gig && gig.ownerId._id === user.id;

  const fetchData = async () => {
    try {
      setLoading(true);
      const gigRes = await api.get(`/gigs/${id}`);
      setGig(gigRes.data);

      if (user && gigRes.data.ownerId._id === user.id) {
        const bidsRes = await api.get(`/bids/${id}`);
        setBids(bidsRes.data);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load gig details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, user]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/bids', { gigId: id, ...bidFormData });
      setSuccess('Bid submitted successfully!');
      setBidFormData({ message: '', price: '' });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit bid');
    }
  };

  const handleHire = async (bidId) => {
    if (!window.confirm('Are you sure you want to hire this freelancer?')) return;
    try {
      await api.patch(`/bids/${bidId}/hire`);
      setSuccess('Freelancer hired successfully!');
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to hire freelancer');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  if (!gig) return <div className="text-center py-20 text-red-500 text-xl">Gig not found</div>;

  return (
    <div className="py-8 max-w-4xl mx-auto">
      {error && <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">{error}</div>}
      {success && <div className="bg-green-50 text-green-500 p-4 rounded-lg mb-6">{success}</div>}
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-4xl font-bold text-gray-800">{gig.title}</h2>
          <span className={`px-4 py-1 rounded-full text-sm font-bold ${gig.status === 'open' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
            {gig.status.toUpperCase()}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Budget</h4>
            <p className="text-3xl font-bold text-gray-800">${gig.budget}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Posted By</h4>
            <p className="text-lg text-gray-700">{gig.ownerId.name}</p>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Description</h4>
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{gig.description}</p>
        </div>
      </div>

      {isOwner && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Received Bids ({bids.length})</h3>
          <div className="space-y-4">
            {bids.length > 0 ? bids.map(bid => (
              <div key={bid._id} className="border p-6 rounded-xl hover:bg-gray-50 transition">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-bold text-lg text-gray-800">{bid.freelancerId.name}</p>
                    <p className="text-sm text-gray-500">{bid.freelancerId.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">${bid.price}</p>
                    <span className={`text-xs font-bold uppercase ${bid.status === 'hired' ? 'text-green-500' : 'text-gray-400'}`}>{bid.status}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 italic">"{bid.message}"</p>
                {gig.status === 'open' && (
                  <button 
                    onClick={() => handleHire(bid._id)}
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Hire Freelancer
                  </button>
                )}
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">No bids received yet.</p>
            )}
          </div>
        </div>
      )}

      {!isOwner && isAuthenticated && gig.status === 'open' && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Submit Your Bid</h3>
          <form onSubmit={handleBidSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Your Proposal</label>
              <textarea
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows="4"
                placeholder="Explain why you're the best fit for this gig..."
                value={bidFormData.message}
                onChange={(e) => setBidFormData({...bidFormData, message: e.target.value})}
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Bid Amount ($)</label>
              <input
                type="number"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="450"
                value={bidFormData.price}
                onChange={(e) => setBidFormData({...bidFormData, price: e.target.value})}
              />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">
              Submit Bid
            </button>
          </form>
        </div>
      )}
      
      {!isAuthenticated && (
        <div className="bg-blue-50 p-6 rounded-xl text-center border border-blue-100">
          <p className="text-blue-700 font-medium mb-4">You must be logged in to bid on this gig.</p>
          <button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-700">Login Now</button>
        </div>
      )}
    </div>
  );
}

export default GigDetailsPage;
// import React from 'react';
// import { useParams } from 'react-router-dom';

// function GigDetailsPage() {
//   const { id } = useParams();
//   return (
//     <div className="py-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-4">Gig Details for ID: {id}</h2>
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-xl font-semibold text-gray-700">Gig Title Placeholder</h3>
//         <p className="text-gray-600 mt-2">Description of the gig goes here. This is a placeholder for the actual gig description fetched from the backend.</p>
//         <p className="text-gray-800 font-bold mt-4">Budget: $500</p>
//         <p className="text-sm text-gray-500">Status: Open</p>

//         <div className="mt-8">
//           <h4 className="text-lg font-semibold text-gray-700 mb-4">Bids for this Gig</h4>
//           <div className="bg-gray-50 p-4 rounded-md">
//             <p className="text-gray-600">No bids yet. (Placeholder)</p>
//           </div>
//         </div>

//         <div className="mt-8">
//           <h4 className="text-lg font-semibold text-gray-700 mb-4">Submit a Bid</h4>
//           <form className="bg-gray-50 p-6 rounded-md">
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bidMessage">
//                 Your Message
//               </label>
//               <textarea
//                 id="bidMessage"
//                 rows="3"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 placeholder="Tell the owner why you're the best fit..."
//               ></textarea>
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bidPrice">
//                 Your Price ($)
//               </label>
//               <input
//                 type="number"
//                 id="bidPrice"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 placeholder="e.g., 450"
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Submit Bid
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GigDetailsPage;