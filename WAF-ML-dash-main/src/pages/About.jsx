import React from 'react';
import Header from '../components/common/Header';

const About = () => {
  return (
    <div className='flex-1 relative z-10 overflow-auto'>
      <Header title="About WAF-ML" />
      <main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">What is WAF-ML?</h2>
            <p className="text-gray-300 mb-4">
              WAF-ML is an advanced Web Application Firewall (WAF) management system that combines traditional security rules with machine learning capabilities to provide enhanced protection for your web applications.
            </p>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2 text-white">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Machine Learning-based threat detection</li>
                <li>Real-time security monitoring</li>
                <li>Customizable security rules</li>
                <li>Comprehensive reporting system</li>
                <li>User-friendly management interface</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">How It Works</h2>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300 mb-4">
                WAF-ML uses a combination of traditional WAF rules and machine learning algorithms to detect and prevent web-based attacks. The system analyzes incoming traffic patterns, learns from historical data, and adapts its security measures in real-time.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 text-white">Traditional WAF</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Rule-based protection</li>
                    <li>Known attack patterns</li>
                    <li>Static security rules</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2 text-white">ML Enhancement</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Pattern recognition</li>
                    <li>Anomaly detection</li>
                    <li>Adaptive learning</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-2 text-white">Enhanced Security</h3>
                <p className="text-gray-300">Advanced threat detection and prevention capabilities</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-2 text-white">Reduced False Positives</h3>
                <p className="text-gray-300">ML algorithms help minimize incorrect threat alerts</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-2 text-white">Easy Management</h3>
                <p className="text-gray-300">User-friendly interface for security configuration</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-2 text-white">Comprehensive Reporting</h3>
                <p className="text-gray-300">Detailed insights into security events and trends</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Contact</h2>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300">
                For more information about WAF-ML or to get support, please contact our team at support@waf-ml.com
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About; 