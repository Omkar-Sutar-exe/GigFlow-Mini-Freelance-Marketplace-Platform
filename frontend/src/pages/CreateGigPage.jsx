import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function CreateGigPage() {
  const [formData, setFormData] = useState({ title: '', description: '', budget: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/gigs', formData);
      navigate('/'); // Redirect to home after successful post
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create gig');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Post a New Gig</h2>
        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">Gig Title</label>
            <input
              type="text"
              id="title"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., Build a Portfolio Website"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">Detailed Description</label>
            <textarea
              id="description"
              required
              rows="6"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Explain exactly what you need..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="budget">Budget (USD)</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                id="budget"
                required
                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="500"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition transform active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Posting...' : 'Post Gig Now'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateGigPage;
// import React from 'react';

// function CreateGigPage() {
//   return (
//     <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Create New Gig</h2>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
//               Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="e.g., Design a website"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//               Description
//             </label>
//             <textarea
//               id="description"
//               rows="5"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Describe your gig requirements"
//             ></textarea>
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="budget">
//               Budget ($)
//             </label>
//             <input
//               type="number"
//               id="budget"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="e.g., 500"
//             />
//           </div>
//           <div className="flex items-center justify-center">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Post Gig
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateGigPage;