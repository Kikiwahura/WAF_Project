import React, { useState } from 'react';
import Header from '../components/common/Header';
import  HttpClients from '../HttpClients';

const Feedback = () => {
  const [form, setForm] = useState({ name: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    try {
      const response = await HttpClients.post('/api/feedback', form);
  
      if (response.status === 200) {
        alert('Thank you for your feedback!');
        setForm({ name: '', message: '' });
      } else {
        alert(response.data?.error || 'Failed to submit feedback.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Could not submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className='flex-1 relative z-10 overflow-auto'>
      <Header title="Feedback" />
      <main className='max-w-2xl mx-auto py-6 px-4 lg:px-8'>
        <section className="bg-gray-800 p-6 rounded-lg shadow-md text-gray-300">
          <h2 className="text-2xl font-semibold mb-4 text-white">We value your feedback</h2>
          <p className="mb-4">Let us know how we're doing or suggest improvements.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-white" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-white" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Feedback;
