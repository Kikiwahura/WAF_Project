import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import HttpClients from '../HttpClients';

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await HttpClients.get('/api/feedbacks');
        setFeedbacks(response.data.reverse()); // Most recent first
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className='flex-1 relative z-10 overflow-auto'>
      <Header title="User Feedbacks" />
      <main className='max-w-3xl mx-auto py-6 px-4 lg:px-8'>
        <section className="bg-gray-800 p-6 rounded-lg shadow-md text-gray-300">
          <h2 className="text-2xl font-semibold mb-4 text-white">Feedback Submissions</h2>

          {loading ? (
            <p>Loading feedbacks...</p>
          ) : feedbacks.length === 0 ? (
            <p className="text-gray-400">No feedback submitted yet.</p>
          ) : (
            <ul className="space-y-4">
              {feedbacks.map((fb, index) => (
                <li key={index} className="border border-gray-700 p-4 rounded bg-gray-700 text-white">
                  <p className="font-semibold text-lg mb-1">{fb.name}</p>
                  <p className="text-sm text-gray-300 whitespace-pre-wrap">{fb.message}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminFeedback;
