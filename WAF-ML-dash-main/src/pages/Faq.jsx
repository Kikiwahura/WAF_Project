import React from 'react';
import Header from '../components/common/Header';

const FAQ = () => {
  return (
    <div className='flex-1 relative z-10 overflow-auto'>
      <Header title="Frequently Asked Questions" />
      <main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">General Questions</h2>
            <div className="bg-gray-800 p-4 rounded-lg space-y-4">
              <div>
                <h3 className="text-xl font-medium text-white">What is the WAF-ML Dashboard?</h3>
                <p className="text-gray-300">It's a web interface for monitoring and managing your Web Application Firewall, powered by machine learning for smarter threat detection.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">Who can access the dashboard?</h3>
                <p className="text-gray-300">Access is restricted to registered administrators and security team members with the appropriate permissions.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Technical Questions</h2>
            <div className="bg-gray-800 p-4 rounded-lg space-y-4">
              <div>
                <h3 className="text-xl font-medium text-white">How are IPs added to the blocklist?</h3>
                <p className="text-gray-300">IPs can be manually added via the Blocklist Management section or automatically based on detection rules and ML insights.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">Can I export reports?</h3>
                <p className="text-gray-300">Yes, you can export reports in PDF format from the Reporting System section.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Security & Privacy</h2>
            <div className="bg-gray-800 p-4 rounded-lg space-y-4">
              <div>
                <h3 className="text-xl font-medium text-white">Is user data collected?</h3>
                <p className="text-gray-300">No personal user data is collected. Only relevant security event logs are stored for analysis.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">How is the system secured?</h3>
                <p className="text-gray-300">The dashboard uses role-based access control to manage access to certain actions of the firewall.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default FAQ;
