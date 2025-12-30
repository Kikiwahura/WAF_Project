import React from 'react';
import Header from '../components/common/Header';

const UserManual = () => {
  return (
    <div className='flex-1 relative z-10 overflow-auto'>
      <Header title="User Manual" />
      <main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Getting Started</h2>
            <p className="text-gray-300 mb-4">
              Welcome to the WAF-ML Dashboard. This system helps you manage and monitor your Web Application Firewall (WAF) with machine learning capabilities.
            </p>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2 text-white">Quick Start Guide</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Navigate to the Overview page to see your system's current status</li>
                <li>Check the Blocklist to view and manage blocked IP addresses</li>
                <li>Use the Management section to configure WAF rules</li>
                <li>Generate Reports to analyze security patterns</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-2 text-white">Overview Dashboard</h3>
                <p className="text-gray-300">Monitor real-time security metrics, active threats, and system health.</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-2 text-white">Blocklist Management</h3>
                <p className="text-gray-300">Add, remove, or modify blocked IP addresses and ranges.</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-2 text-white">Rule Configuration</h3>
                <p className="text-gray-300">Customize WAF rules and security policies to match your needs.</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-2 text-white">Reporting System</h3>
                <p className="text-gray-300">Generate detailed reports on security incidents and system performance.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Best Practices</h2>
            <div className="bg-gray-800 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Regularly review and update your blocklist</li>
                <li>Monitor the Overview dashboard for unusual activity</li>
                <li>Generate weekly reports to track security trends</li>
                <li>Keep your WAF rules up to date with the latest security threats</li>
                <li>Regularly backup your configuration settings</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Troubleshooting</h2>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2 text-white">Common Issues</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>If the dashboard is not loading, check your internet connection</li>
                <li>For rule conflicts, review the Management section</li>
                <li>If reports are not generating, ensure you have sufficient data</li>
                <li>Contact support if you encounter persistent issues</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserManual; 